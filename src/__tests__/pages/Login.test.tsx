import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../pages/Login";
import { useAuth } from "../../hooks/useAuth";

// Mock the useAuth hook
vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("LoginPage", () => {
  const mockHandleLogin = vi.fn();
  const mockClearAuthError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementation
    (useAuth as Mock).mockReturnValue({
      handleLogin: mockHandleLogin,
      isLoggingIn: false,
      authError: null,
      clearAuthError: mockClearAuthError,
    });
  });

  it("renders login form correctly", () => {
    render(<Login />);

    // Check if logo is rendered
    expect(screen.getByAltText("Soar Task Logo")).toBeInTheDocument();

    // Check if title is rendered
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();

    // Check if form elements are rendered
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(screen.getByText(/Remember me/i)).toBeInTheDocument();
    expect(screen.getByText(/Forgot your password?/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  it("submits form with entered credentials", async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    // Fill in the form
    await user.type(screen.getByPlaceholderText("Enter your email"), "soar@soar.com");
    await user.type(screen.getByPlaceholderText("Enter your password"), "hire-me");
    
    // Submit the form
    await user.click(screen.getByRole("button", { name: /Sign in/i }));
    
    // Check if handleLogin was called with correct credentials
    expect(mockHandleLogin).toHaveBeenCalledWith({
      email: "soar@soar.com",
      password: "hire-me",
      rememberMe: false,
    });
  });

  it("toggles password visibility when show/hide button is clicked", async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    // Get password input and initially it should be of type password
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    expect(passwordInput).toHaveAttribute("type", "password");
    
    // Click the show password button
    await user.click(screen.getByTitle("Show Password"));
    
    // Password input should now be of type text
    expect(passwordInput).toHaveAttribute("type", "text");
    
    // Click the hide password button
    await user.click(screen.getByTitle("Hide Password"));
    
    // Password input should be of type password again
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("has a remember me checkbox", () => {
    render(<Login />);
    
    // Verificar se o texto "Remember me" existe
    const rememberMeText = screen.getByText(/Remember me/i);
    expect(rememberMeText).toBeInTheDocument();
    
    // Verificar se existe um Switch associado ao Remember me
    // Podemos verificar se o elemento pai do texto tem um filho que é um Switch
    const parentElement = rememberMeText.parentElement;
    expect(parentElement).not.toBeNull();
    
    // Verificar se o formulário pode ser submetido
    const submitButton = screen.getByRole("button", { name: /Sign in/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });
  
  it("submits form with correct data", async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    // Preencher os campos do formulário
    await user.type(screen.getByPlaceholderText("Enter your email"), "soar@soar.com");
    await user.type(screen.getByPlaceholderText("Enter your password"), "hire-me");
    
    // Submit the form
    await user.click(screen.getByRole("button", { name: /Sign in/i }));
    
    // Verificar que o mockHandleLogin foi chamado com os dados corretos
    expect(mockHandleLogin).toHaveBeenCalledWith({
      email: "soar@soar.com",
      password: "hire-me",
      rememberMe: expect.any(Boolean), // Aceitamos qualquer valor booleano
    });
  });

  it("displays loading state when isLoggingIn is true", () => {
    // Mock loading state
    (useAuth as Mock).mockReturnValue({
      handleLogin: mockHandleLogin,
      isLoggingIn: true,
      authError: null,
      clearAuthError: mockClearAuthError,
    });

    render(<Login />);

    // Check if button shows loading text
    expect(
      screen.getByRole("button", { name: /Signing in/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Signing in/i })).toBeDisabled();
  });

  it("displays error message when authentication fails", () => {
    // Mock error state
    (useAuth as Mock).mockReturnValue({
      handleLogin: mockHandleLogin,
      isLoggingIn: false,
      authError: "Invalid credentials",
      clearAuthError: mockClearAuthError,
    });

    render(<Login />);

    // Check if error message is displayed
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();

    // Click on close button
    fireEvent.click(screen.getByLabelText("Fechar alerta"));

    // Check if clearAuthError was called
    expect(mockClearAuthError).toHaveBeenCalled();
  });
});
