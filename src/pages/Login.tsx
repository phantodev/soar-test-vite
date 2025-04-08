import { useState, Suspense } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Switch } from "@heroui/switch";
import { useAuth } from "../hooks/useAuth";
import type { LoginCredentials } from "../types/auth";
import { Spinner } from "@heroui/spinner";

const LoginPage = () => {
	// State for form fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
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
							type={showPassword ? "text" : "password"}
							label="Password"
							placeholder="Enter your password"
							labelPlacement="outside"
							required
							fullWidth
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							errorMessage="Please enter your password"
							endContent={
								<button
									type="button"
									className="focus:outline-none"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 text-gray-400"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-labelledby="hide-password-title"
											role="img"
										>
											<title id="hide-password-title">Hide Password</title>
											<path
												fillRule="evenodd"
												d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
												clipRule="evenodd"
											/>
											<path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 text-gray-400"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-labelledby="show-password-title"
											role="img"
										>
											<title id="show-password-title">Show Password</title>
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
											<path
												fillRule="evenodd"
												d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
												clipRule="evenodd"
											/>
										</svg>
									)}
								</button>
							}
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
								onClick={() => alert("Funcionalidade não implementada")}
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
		<Suspense
			fallback={
				<div className="flex items-center justify-center min-h-screen">
					<Spinner color="primary" size="lg" />
				</div>
			}
		>
			<LoginPage />
		</Suspense>
	);
};

export default LoginPageWrapper;
