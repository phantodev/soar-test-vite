import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock React Router DOM
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
  }),
  useParams: () => ({}),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => 
    React.createElement('a', { href: to }, children),
  Navigate: ({ to }: { to: string }) => 
    React.createElement('div', null, `Navigate to ${to}`),
}));

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock Image component (if needed)
vi.mock('../components/ui/Image', () => ({
  default: vi.fn().mockImplementation(({ src, alt, ...props }) => {
    // Using createElement instead of JSX to avoid syntax issues
    return React.createElement('img', { src, alt, ...props });
  }),
}));

// We don't need TextEncoder/TextDecoder polyfill as it's already available in the test environment
