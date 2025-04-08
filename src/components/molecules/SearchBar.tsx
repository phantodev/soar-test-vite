import type { FC } from "react";
import { Input } from "@heroui/input";
import { SearchIcon } from "../icons";

/**
 * SearchBar Component
 *
 * A reusable search input component that provides:
 * - Customizable placeholder text
 * - Consistent styling with the application design system
 * - Search icon integration
 * - Responsive width through className prop
 *
 * This component follows the Atomic Design methodology as a molecule
 * composed of the Input atom and SearchIcon atom.
 */
interface SearchBarProps {
	placeholder?: string;
	className?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
	placeholder = "Search for something",
	className = "",
}) => {
	return (
		<div className={className}>
			<Input
				type="text"
				placeholder={placeholder}
				classNames={{
					base: "h-[50px]",
					input: "text-sm placeholder:text-secondary",
					inputWrapper: "h-[50px] rounded-full bg-gray-100 dark:bg-gray-400 ",
				}}
				startContent={<SearchIcon className="text-secondary ml-2" />}
			/>
		</div>
	);
};
