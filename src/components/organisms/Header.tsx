import { SearchBar } from "../molecules/SearchBar";
import { Avatar } from "../atoms/Avatar";
import {
	NotificationIcon,
	SettingsOutlineIcon,
	MenuIcon,
} from "../atoms/SidebarIcons";
import { Button } from "@heroui/button";

/**
 * Header Component
 *
 * Provides the top navigation bar for the application with:
 * - Page title display
 * - Search functionality
 * - Quick access controls (settings, notifications)
 * - User profile access
 *
 * This component follows the Atomic Design methodology as an organism
 * composed of multiple atoms and molecules.
 */
interface HeaderProps {
	title?: string;
	onMenuClick?: () => void;
}

export const Header = ({ title = "Overview", onMenuClick }: HeaderProps) => {
	return (
		<header className="flex flex-col md:flex-row md:items-center md:justify-between h-auto md:h-24 px-4 sm:px-6 md:px-8 bg-white dark:bg-gray-900 lg:border-b lg:border-gray-200 dark:border-gray-800">
			{/* Mobile layout - stacked with search below */}
			<div className="flex items-center justify-between py-4 md:py-0 w-full">
				{/* Left side with menu and title */}
				<div className="flex items-center">
					<Button
						isIconOnly
						variant="light"
						className="md:hidden mr-2 bg-transparent hover:bg-gray-100 menu-button"
						onPress={onMenuClick}
					>
						<MenuIcon className="text-primary" />
					</Button>

					{/* Page title with primary color styling */}
					<h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary dark:text-white">
						{title}
					</h1>
				</div>

				{/* Controls - different layout for mobile and desktop */}
				<div className="flex items-center">
					{/* Search functionality - only visible on desktop */}
					<div className="hidden md:block mr-6">
						<SearchBar placeholder="Search for something" className="w-64" />
					</div>

					{/* Settings button with secondary color icon */}
					<Button
						isIconOnly
						variant="light"
						radius="full"
						className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 size-[40px] sm:size-[45px] md:size-[50px]"
					>
						<SettingsOutlineIcon className="text-secondary" />
					</Button>

					{/* Notifications button with tertiary color icon */}
					<Button
						isIconOnly
						variant="light"
						radius="full"
						className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 size-[40px] sm:size-[45px] md:size-[50px] mx-2 sm:mx-4"
					>
						<NotificationIcon className="text-terciary" />
					</Button>

					{/* User avatar for profile access */}
					<Avatar
						src="/assets/avatar.png"
						alt="User avatar"
						className="size-[40px] sm:size-[45px] md:size-[50px]"
					/>
				</div>
			</div>

			{/* Search bar row - only visible on mobile and tablet */}
			<div className="pb-4 md:hidden w-full">
				<SearchBar placeholder="Search for something" className="w-full" />
			</div>
		</header>
	);
};
