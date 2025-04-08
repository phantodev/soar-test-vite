import { type FC, useState, useMemo } from "react";
import { Input } from "@heroui/input";
import { I18nProvider } from "@react-aria/i18n";
import { DatePicker } from "@heroui/date-picker";
import { today, parseDate, type DateValue } from "@internationalized/date";
import { useUserStore } from "../store/useUserStore";
import { toast } from "react-toastify";
import { format } from "date-fns";

const SettingsPage: FC = () => {
	const [activeTab, setActiveTab] = useState("profile");
	const formattedToday = format(new Date(), "yyyy-MM-dd");

	// Get only the updateProfile function from the store
	const updateProfile = useUserStore((state) => state.updateProfile);

	// Get initial values from the store only once
	const initialValues = useMemo(() => {
		const state = useUserStore.getState();
		return {
			name: state.name,
			userName: state.userName,
			email: state.email,
			password: state.password,
			dateOfBirth: state.dateOfBirth || today("UTC"), // Provide fallback
			presentAddress: state.presentAddress,
			permanentAddress: state.permanentAddress,
			city: state.city,
			postalCode: state.postalCode,
			country: state.country,
			profilePicture: state.profilePicture,
		};
	}, []);

	// Local form state - initialized with memoized values
	const [formData, setFormData] = useState(initialValues);
	// Add loading state for the Save button
	const [isLoading, setIsLoading] = useState(false);
	// Add error states for form validation
	const [errors, setErrors] = useState<Record<string, boolean>>({});
	// State for password visibility toggle
	const [showPassword, setShowPassword] = useState(false);

	// Handle input changes
	const handleInputChange = (field: string, value: string | DateValue) => {
		// Clear error state when user types in a field
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: false }));
		}

		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	// Validate form fields
	const validateForm = () => {
		const fieldsToValidate = [
			"name",
			"userName",
			"email",
			"password",
			"presentAddress",
			"permanentAddress",
			"city",
			"postalCode",
			"country"
		];

		const newErrors: Record<string, boolean> = {};
		let hasErrors = false;

		// Check each field for empty values
		for (const field of fieldsToValidate) {
			const value = formData[field as keyof typeof formData];
			const isEmpty = typeof value === 'string' && value.trim() === '';
			
			if (isEmpty) {
				newErrors[field] = true;
				hasErrors = true;
			}
		}

		setErrors(newErrors);
		return !hasErrors;
	};

	// Save changes to Zustand store
	const handleSave = () => {
		// Validate form before saving
		if (!validateForm()) {
			toast.error("Form with error. Please check!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			return;
		}

		setIsLoading(true);
		// Simulate a small delay for better UX
		setTimeout(() => {
			updateProfile(formData);
			toast.success("Profile updated successfully!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			setIsLoading(false);
		}, 500);
	};

	return (
		<div className="p-4 sm:p-6 w-full mx-auto bg-white rounded-xl shadow-sm">
			<div className="border-b w-full flex space-x-4 sm:space-x-8 mb-6 sm:mb-8 overflow-x-auto pb-1">
				<button
					type="button"
					onClick={() => setActiveTab("profile")}
					className={`pb-4 px-2 whitespace-nowrap text-sm sm:text-base font-medium ${activeTab === "profile" ? "border-b-2 border-black" : "text-secondary"}`}
				>
					Edit Profile
				</button>
				<button
					type="button"
					onClick={() => setActiveTab("preferences")}
					className={`pb-4 px-2 whitespace-nowrap text-sm sm:text-base font-medium ${activeTab === "preferences" ? "border-b-2 border-black" : "text-secondary"}`}
				>
					Preferences
				</button>
				<button
					type="button"
					onClick={() => setActiveTab("security")}
					className={`pb-4 px-2 whitespace-nowrap text-sm sm:text-base font-medium ${activeTab === "security" ? "border-b-2 border-black" : "text-secondary"}`}
				>
					Security
				</button>
			</div>

			{activeTab === "profile" && (
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Profile Picture - Top on mobile/tablet, left column on desktop */}
					<div className="w-full lg:w-1/6 flex justify-center">
						<div className="relative w-24 h-24 sm:w-32 sm:h-32">
							<div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
								<img
									src={formData.profilePicture}
									alt="Profile"
									className="object-cover w-full h-full"
								/>
							</div>
							<button
								type="button"
								className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1 shadow-md"
								aria-label="Edit profile picture"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<title>Edit icon</title>
									<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
								</svg>
							</button>
						</div>
					</div>

					{/* Form - Single column on mobile/tablet, two columns on desktop */}
					<div className="w-full lg:w-5/6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
							{/* Your Name */}
							<div className="space-y-2">
								<label
									htmlFor="yourName"
									className="block text-sm font-medium text-gray-700"
								>
									Your Name
								</label>
								<Input
									size="lg"
									id="yourName"
									type="text"
									value={formData.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
									className="w-full"
									isInvalid={errors.name}
									errorMessage={errors.name ? "This field is required" : ""}
									classNames={{
										input: "!text-secondary !text-gray-700 font-medium",
										base: "text-secondary"
									}}
								/>
							</div>

							{/* User Name */}
							<div className="space-y-2">
								<label
									htmlFor="userName"
									className="block text-sm font-medium text-gray-700"
								>
									User Name
								</label>
								<Input
									size="lg"
									id="userName"
									type="text"
									value={formData.userName}
									onChange={(e) =>
										handleInputChange("userName", e.target.value)
									}
									className="w-full"
									isInvalid={errors.userName}
									errorMessage={errors.userName ? "This field is required" : ""}
									classNames={{
										input: "!text-secondary !text-gray-700 font-medium",
										base: "text-secondary"
									}}
								/>
							</div>

							{/* Email */}
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email
								</label>
								<Input
									size="lg"
									id="email"
									type="email"
									value={formData.email}
									onChange={(e) => handleInputChange("email", e.target.value)}
									className="w-full"
									isInvalid={errors.email}
									errorMessage={errors.email ? "This field is required" : ""}
									classNames={{
										input: "!text-secondary !text-gray-700 font-medium",
										base: "text-secondary"
									}}
								/>
							</div>

							{/* Password */}
							<div className="space-y-2">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Password
								</label>
								<Input
									size="lg"
									id="password"
									type={showPassword ? "text" : "password"}
									value={formData.password}
									onChange={(e) =>
										handleInputChange("password", e.target.value)
									}
									className="w-full"
									isInvalid={errors.password}
									errorMessage={errors.password ? "This field is required" : ""}
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
									classNames={{
										input: "!text-secondary !text-gray-700 font-medium",
										base: "text-secondary"
									}}
								/>
							</div>

							{/* Date of Birth */}
							<div className="space-y-2">
								<I18nProvider locale="pt-br">
									<DatePicker
										id="dob"
										size="lg"
										label="Date of Birth"
										value={parseDate(formattedToday) as DateValue}
										labelPlacement="outside"
										color="secondary"
										classNames={{
											base: "w-full",
											label: "!text-black !text-sm",
											inputWrapper: "!bg-zinc-100",
										}}
									/>
								</I18nProvider>
							</div>

							{/* Present Address */}
							<div className="space-y-2">
								<label
									htmlFor="presentAddress"
									className="block text-sm font-medium text-gray-700"
								>
									Present Address
								</label>
								<Input
									size="lg"
									id="presentAddress"
									type="text"
									value={formData.presentAddress}
									onChange={(e) =>
										handleInputChange("presentAddress", e.target.value)
									}
									className="w-full"
									isInvalid={errors.presentAddress}
									errorMessage={errors.presentAddress ? "This field is required" : ""}
									classNames={{
										input: "!text-secondary !text-gray-700 font-medium",
										base: "text-secondary"
									}}
								/>
							</div>

							{/* Permanent Address */}
							<div className="space-y-2">
								<label
									htmlFor="permanentAddress"
									className="block text-sm font-medium text-gray-700"
								>
									Permanent Address
								</label>
								<Input
									size="lg"
									id="permanentAddress"
									type="text"
									value={formData.permanentAddress}
									onChange={(e) =>
										handleInputChange("permanentAddress", e.target.value)
									}
									className="w-full"
									isInvalid={errors.permanentAddress}
									errorMessage={errors.permanentAddress ? "This field is required" : ""}
									classNames={{
										input: "!text-secondary !text-gray-700 font-medium",
										base: "text-secondary"
									}}
								/>
							</div>

							{/* City */}
							<div className="space-y-2">
								<label
									htmlFor="city"
									className="block text-sm font-medium text-gray-700"
								>
									City
								</label>
								<Input
									size="lg"
									id="city"
									type="text"
									value={formData.city}
									onChange={(e) => handleInputChange("city", e.target.value)}
									className="w-full"
									isInvalid={errors.city}
									errorMessage={errors.city ? "This field is required" : ""}
									classNames={{
										input: "!text-secondary !text-gray-700 font-medium",
										base: "text-secondary"
									}}
								/>
							</div>

							{/* Postal Code */}
							<div className="space-y-2">
								<label
									htmlFor="postalCode"
									className="block text-sm font-medium text-gray-700"
								>
									Postal Code
								</label>
								<Input
									size="lg"
									id="postalCode"
									type="text"
									value={formData.postalCode}
									onChange={(e) =>
										handleInputChange("postalCode", e.target.value)
									}
									className="w-full"
									isInvalid={errors.postalCode}
									errorMessage={errors.postalCode ? "This field is required" : ""}
									classNames={{
										input: "!text-secondary !text-gray-700 font-medium",
										base: "text-secondary"
									}}
								/>
							</div>

							{/* Country */}
							<div className="space-y-2">
								<label
									htmlFor="country"
									className="block text-sm font-medium text-gray-700"
								>
									Country
								</label>
								<Input
									size="lg"
									id="country"
									type="text"
									value={formData.country}
									onChange={(e) => handleInputChange("country", e.target.value)}
									className="w-full"
									isInvalid={errors.country}
									errorMessage={errors.country ? "This field is required" : ""}
									classNames={{
										input: "!text-secondary !text-gray-700 font-medium",
										base: "text-secondary"
									}}
								/>
							</div>
						</div>

						{/* Save Button */}
						<div className="flex justify-center lg:justify-end mt-6 col-span-1 lg:col-span-2">
							<button
								type="button"
								onClick={handleSave}
								disabled={isLoading}
								className="w-full sm:w-40 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
							>
								{isLoading ? "Saving..." : "Save"}
							</button>
						</div>
					</div>
				</div>
			)}

			{activeTab === "preferences" && (
				<div className="p-4">
					<h2 className="text-xl font-semibold mb-4">Preferences</h2>
					<p className="text-gray-600">
						Here we gonna put some information about the user preferences.
					</p>
				</div>
			)}

			{activeTab === "security" && (
				<div className="p-4 ">
					<h2 className="text-xl font-semibold mb-4">Security</h2>
					<p className="text-gray-600">
						Here we gonna put some information about the user security.
					</p>
				</div>
			)}
		</div>
	);
};

export default SettingsPage;
