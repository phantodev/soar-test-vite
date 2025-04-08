import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, logoutUser } from "../services/auth";
import type { LoginCredentials, AuthResponse } from "../types/auth";

export function useAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Get the callback URL from location state or use dashboard as default
  const from = location.state?.from?.pathname || "/dashboard";

  // Mutation for login
  const loginMutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: async (credentials: LoginCredentials) => {
      try {
        const response = await loginUser(credentials);
        if (!response.success) {
          throw new Error(response.error || "Authentication failed");
        }
        return response;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("An error occurred during login");
      }
    },
    onSuccess: () => {
      // Clear any previous error
      setAuthError(null);
      
      // Display success toast
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      console.log('Login successful, redirecting to:', from);
      
      // Add a small delay before redirecting to ensure cookies are set
      setTimeout(() => {
        // Redirect to callback URL or dashboard after successful login
        navigate(from, { replace: true });
      }, 300);
    },
    onError: (error) => {
      // Set error message
      setAuthError(error.message);
      
      // Display error toast
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  // Mutation for logout
  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await logoutUser();
        if (!response.success) {
          throw new Error("Failed to logout");
        }
        return response;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("An error occurred during logout");
      }
    },
    onSuccess: () => {
      // Display success toast
      toast.success("Logout successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Redirect to login page after successful logout
      navigate("/");
    },
    onError: (error) => {
      console.error("Error during logout:", error);
      
      // Display error toast
      toast.error("Error during logout", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });

  // Function to handle login
  const handleLogin = async (credentials: LoginCredentials) => {
    loginMutation.mutate(credentials);
  };

  // Function to handle logout
  const handleLogout = async () => {
    logoutMutation.mutate();
  };

  return {
    handleLogin,
    handleLogout,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    authError,
    clearAuthError: () => setAuthError(null),
  };
}
