import { type FC, useState } from "react";
import { Input } from "@heroui/input";
import { I18nProvider } from "@react-aria/i18n";
import { DatePicker } from "@heroui/date-picker";
import { parseDate, type DateValue } from "@internationalized/date";
import { format } from "date-fns";

const SettingsPage: FC = () => {
	const [activeTab, setActiveTab] = useState("profile");
	const formattedToday = format(new Date(), "yyyy-MM-dd");

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
									src="/assets/avatar-big.png"
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
									defaultValue="Charlene Reed"
									className="w-full"
									classNames={{
										input: "!text-secondary",
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
									defaultValue="Charlene Reed"
									className="w-full"
									classNames={{
										input: "!text-secondary",
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
									defaultValue="charlenereed@gmail.com"
									className="w-full"
									classNames={{
										input: "!text-secondary",
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
									type="password"
									defaultValue="**********"
									className="w-full"
									classNames={{
										input: "!text-secondary",
									}}
								/>
							</div>

							{/* Date of Birth */}
							<div className="space-y-2">
								<I18nProvider locale="pt-br">
									<div className="text-secondary">
										<DatePicker
											id="dob"
											size="lg"
											label="Date of Birth"
											value={parseDate(formattedToday) as DateValue}
											labelPlacement="outside"
											color="secondary"
											classNames={{
												base: "w-full text-secondary",

												inputWrapper: "!bg-zinc-100",
											}}
										/>
									</div>
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
									defaultValue="San Jose, California, USA"
									className="w-full"
									classNames={{
										input: "!text-secondary",
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
									defaultValue="San Jose, California, USA"
									className="w-full"
									classNames={{
										input: "!text-secondary",
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
									defaultValue="San Jose"
									className="w-full"
									classNames={{
										input: "!text-secondary",
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
									defaultValue="45962"
									className="w-full"
									classNames={{
										input: "!text-secondary",
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
									defaultValue="USA"
									className="w-full"
									classNames={{
										input: "!text-secondary",
									}}
								/>
							</div>
						</div>

						{/* Save Button */}
						<div className="flex justify-center lg:justify-end mt-6 col-span-1 lg:col-span-2">
							<button
								type="button"
								className="w-full sm:w-40 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
							>
								Save
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
