import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { Mock } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useAuth } from '../../hooks/useAuth';
import { loginUser, logoutUser } from '../../services/auth';
import { toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Increase timeout for all tests in this file
vi.setConfig({ testTimeout: 10000 });

// Mock the auth services
vi.mock('../../services/auth', () => ({
  loginUser: vi.fn(),
  logoutUser: vi.fn(),
}));

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: { from: { pathname: '/dashboard' } },
  }),
}));

// Create a wrapper with React Query provider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useAuth hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers({ shouldAdvanceTime: true });
    
    // Reset mocks for router
    mockNavigate.mockReset();
    
    // Mock successful login by default
    (loginUser as Mock).mockResolvedValue({
      success: true,
      user: { id: 'user-123', name: 'Usuário Soar', email: 'soar@soar.com', role: 'admin' },
      token: 'mock-token',
    });
    
    // Mock successful logout by default
    (logoutUser as Mock).mockResolvedValue({
      success: true,
    });
  });
  
  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('should handle successful login', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });
    
    // Call handleLogin
    result.current.handleLogin({
      email: 'soar@soar.com',
      password: 'hire-me',
      rememberMe: false,
    });
    
    // Wait for the mutation to complete
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: 'soar@soar.com',
        password: 'hire-me',
        rememberMe: false,
      });
    }, { timeout: 1000 });
    
    // Check toast was called
    expect(toast.success).toHaveBeenCalledWith(
      'Login successful!',
      expect.any(Object)
    );
    
    // Advance timers to trigger the redirect
    vi.advanceTimersByTime(500);
    
    // Check navigate was called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', expect.any(Object));
  });

  it('should handle login failure', async () => {
    // Mock failed login
    (loginUser as Mock).mockResolvedValue({
      success: false,
      error: 'Invalid credentials',
    });
    
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });
    
    // Call handleLogin
    result.current.handleLogin({
      email: 'wrong@email.com',
      password: 'wrong-password',
      rememberMe: false,
    });
    
    // Wait for the mutation to complete
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: 'wrong@email.com',
        password: 'wrong-password',
        rememberMe: false,
      });
    }, { timeout: 1000 });
    
    // Check error toast was called
    expect(toast.error).toHaveBeenCalledWith(
      'Invalid credentials',
      expect.any(Object)
    );
    
    // Check that authError is set
    expect(result.current.authError).toBe('Invalid credentials');
  });

  it('should handle successful logout', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });
    
    // Call handleLogout
    result.current.handleLogout();
    
    // Wait for the mutation to complete
    await waitFor(() => {
      expect(logoutUser).toHaveBeenCalled();
    }, { timeout: 1000 });
    
    // Check toast was called
    expect(toast.success).toHaveBeenCalledWith(
      'Logout successful!',
      expect.any(Object)
    );
    
    // Check navigate was called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should handle logout failure', async () => {
    // Mock failed logout
    (logoutUser as Mock).mockRejectedValue(new Error('Failed to logout'));
    
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });
    
    // Call handleLogout
    result.current.handleLogout();
    
    // Wait for the mutation to complete
    await waitFor(() => {
      expect(logoutUser).toHaveBeenCalled();
    }, { timeout: 1000 });
    
    // Check error toast was called
    expect(toast.error).toHaveBeenCalledWith(
      'Error during logout',
      expect.any(Object)
    );
  });

  it('should clear auth error', async () => {
    // Mock failed login
    (loginUser as Mock).mockResolvedValue({
      success: false,
      error: 'Invalid credentials'
    });
    
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });
    
    // Call handleLogin to set the error
    await act(async () => {
      try {
        await result.current.handleLogin({
          email: 'test@example.com',
          password: 'wrong-password',
          rememberMe: false
        });
      } catch (error) {
        // Expected to fail
      }
    });
    
    // Verify that the error is set
    await waitFor(() => {
      expect(result.current.authError).toBe('Invalid credentials');
    }, { timeout: 1000 });
    
    // Call clearAuthError
    await act(async () => {
      result.current.clearAuthError();
    });
    
    // Verify that the error was cleared
    expect(result.current.authError).toBeNull();
  });
});
