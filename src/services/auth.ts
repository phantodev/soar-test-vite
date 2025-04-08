import Cookies from 'js-cookie';
import type { LoginCredentials, AuthResponse } from '../types/auth';

// Cookie names constants
const AUTH_TOKEN_COOKIE = 'auth-token';
const USER_INFO_COOKIE = 'user-info';

/**
 * Client-side service for user authentication
 * This is a simulation that returns mocked data
 */
export async function loginUser(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  // Simulating network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Check if credentials are valid
  const isValidEmail = credentials.email === "soar@soar.com";
  const isValidPassword = credentials.password === "hire-me";

  // If credentials are not valid, return error
  if (!isValidEmail || !isValidPassword) {
    return {
      success: false,
      error:
        "Email or password is invalid. Use 'soar@soar.com' and 'hire-me' for login.",
    };
  }

  // Mocked data for simulation (only if credentials are valid)
  const mockUser = {
    id: "user-123",
    name: "Usuário Soar",
    email: credentials.email,
    role: "admin",
  };

  // Mocked JWT token
  const mockToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEyMyIsIm5hbWUiOiJVc3XDoXJpbyBTb2FyIiwiaWF0IjoxNTE2MjM5MDIyfQ";

  // Set authentication cookies
  const maxAge = credentials.rememberMe ? 30 : 1; // 30 days or 1 day
  
  // Set auth token cookie
  Cookies.set(AUTH_TOKEN_COOKIE, mockToken, { 
    path: '/',
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    expires: maxAge
  });
  
  // Store basic user info in another cookie (non-sensitive data)
  Cookies.set(USER_INFO_COOKIE, JSON.stringify({
    name: mockUser.name,
    email: mockUser.email,
    role: mockUser.role,
  }), { 
    path: '/',
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    expires: maxAge
  });
  
  console.log(`Successful login for ${credentials.email}`);

  return {
    success: true,
    user: mockUser,
    token: mockToken,
  };
}

/**
 * Client-side service for user logout
 */
export async function logoutUser(): Promise<{ success: boolean }> {
  // Simulating network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Remove authentication cookies
  Cookies.remove(AUTH_TOKEN_COOKIE, { path: '/' });
  Cookies.remove(USER_INFO_COOKIE, { path: '/' });
  
  console.log('Removing auth cookies');

  return {
    success: true,
  };
}

/**
 * Helper function to check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = Cookies.get(AUTH_TOKEN_COOKIE);
  return !!token;
}

/**
 * Get user info from cookie
 */
export function getUserInfo() {
  const userInfoString = Cookies.get(USER_INFO_COOKIE);
  if (!userInfoString) return null;
  
  try {
    return JSON.parse(userInfoString);
  } catch (error) {
    console.error('Error parsing user info', error);
    return null;
  }
}
