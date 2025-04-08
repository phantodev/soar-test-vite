import { Link } from "react-router-dom";

/**
 * SidebarNavItem Component
 * 
 * Represents an individual navigation item in the sidebar.
 * Features:
 * - Visual indication of active state
 * - Icon and label display
 * - Link functionality to the target route
 * - Consistent styling with design system
 * 
 * This component is designed to be used within the Sidebar component
 * and receives its active state from the parent component.
 */
interface SidebarNavItemProps {
  href: string;
  icon: string;
  label: string;
  isActive: boolean;
}

export const SidebarNavItem = ({
  href,
  icon,
  label,
  isActive,
}: SidebarNavItemProps) => {
  return (
    <div className="relative">
      <Link
        to={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
          isActive ? "text-black" : "text-[#B1B1B1] hover:text-gray-700"
        }`}
      >
        {/* Icon with dynamic brightness based on active state */}
        <div className="w-[25px] h-[25px] relative">
          <img
            src={icon}
            alt={`${label} icon`}
            width={25}
            height={25}
            className={`${isActive ? "brightness-0" : "brightness-75"}`}
          />
        </div>
        {/* Navigation item label */}
        <span className="text-[18px] font-medium">{label}</span>
      </Link>
    </div>
  );
};
