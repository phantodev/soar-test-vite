import { useState, Suspense } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Switch } from "@heroui/switch";
import { useAuth } from "../hooks/useAuth";
import type { LoginCredentials } from "../types/auth";

const LoginPage = () => {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Using the authentication hook
  const { handleLogin, isLoggingIn, authError, clearAuthError } = useAuth();

  // Function to handle form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Creating the credentials object
    const credentials: LoginCredentials = {
      email,
      password,
      rememberMe,
    };

    // Calling the login function
    handleLogin(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src="/assets/logo-soar.svg"
            alt="Soar Task Logo"
            width={200}
            height={50}
            className="mb-6"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-10">
            Sign in to your account
          </h2>
          {authError && (
            <div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-10"
              role="alert"
            >
              <span className="block sm:inline">{authError}</span>
              <button
                type="button"
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={clearAuthError}
                onKeyUp={(e) => e.key === "Enter" && clearAuthError()}
                aria-label="Fechar alerta"
              >
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <form className="space-y-6 mt-10" onSubmit={onSubmit}>
          <div className="space-y-10">
            <Input
              size="lg"
              type="email"
              label="Email address"
              placeholder="Enter your email"
              labelPlacement="outside"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errorMessage="Please enter a valid email address"
            />
            <Input
              size="lg"
              type="password"
              label="Password"
              placeholder="Enter your password"
              labelPlacement="outside"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errorMessage="Please enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Switch
                id="remember-me"
                size="sm"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-500"
                onClick={() => alert('Funcionalidade não implementada')}
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <Button
              size="lg"
              type="submit"
              color="primary"
              fullWidth
              className="py-2"
              isLoading={isLoggingIn}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const LoginPageWrapper = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
};

export default LoginPageWrapper;
