import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Logo } from "../atoms/Logo";
import { SidebarNavItem } from "../molecules/SidebarNavItem";
import { useAuth } from "../../hooks/useAuth";

/**
 * Navigation configuration
 *
 * Defines all available navigation items in the sidebar.
 * Each item requires:
 * - href: Target route path
 * - icon: Path to the icon asset
 * - label: Display text for the navigation item
 */
const navigationItems = [
  {
    href: "/dashboard",
    icon: "/assets/dashboard-icon.svg",
    label: "Dashboard",
  },
  {
    href: "/transactions",
    icon: "/assets/transactions-icon.svg",
    label: "Transactions",
  },
  { href: "/accounts", icon: "/assets/accounts-icon.svg", label: "Accounts" },
  {
    href: "/investments",
    icon: "/assets/investiments-icon.svg",
    label: "Investments",
  },
  {
    href: "/credit-cards",
    icon: "/assets/credit-card-icon.svg",
    label: "Credit Cards",
  },
  { href: "/loans", icon: "/assets/loan-icon.svg", label: "Loans" },
  { href: "/services", icon: "/assets/service-icon.svg", label: "Services" },
  {
    href: "/my-privileges",
    icon: "/assets/my-privileges-icon.svg",
    label: "My Privileges",
  },
  { href: "/settings", icon: "/assets/settings-icon.svg", label: "Setting" },
];

/**
 * Sidebar Component
 *
 * Provides the main navigation interface for the application.
 * Features:
 * - Responsive sidebar with navigation links
 * - Active state indication with animated indicator
 * - Route-based navigation highlighting
 */
export const Sidebar = () => {
  const location = useLocation();
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const { handleLogout, isLoggingOut } = useAuth();

  /**
   * Effect to track and update the active navigation item
   * based on the current route path
   */
  useEffect(() => {
    const index = navigationItems.findIndex(
      (item) => location.pathname === item.href || location.pathname.startsWith(`${item.href}/`),
    );
    setActiveItemIndex(index !== -1 ? index : null);
  }, [location.pathname]);

  // Constants for indicator position calculation
  /**
   * getItemPosition
   *
   * Calculates the exact vertical position for the active indicator
   * based on the index of the active menu item.
   *
   * Each position is fine-tuned to ensure perfect visual alignment
   * with the corresponding menu item.
   *
   * @param index - The index of the active menu item
   * @returns The vertical position in pixels
   */
  const getItemPosition = (index: number) => {
    // Specific positions for each menu item
    switch (index) {
      case 0:
        return 0; // Dashboard
      case 1:
        return 55; // Transactions
      case 2:
        return 118; // Accounts
      case 3:
        return 175; // Investments
      case 4:
        return 235; // Credit Cards
      case 5:
        return 295; // Loans
      case 6:
        return 350; // Services
      case 7:
        return 410; // My Privileges
      case 8:
        return 470; // Settings
      default:
        return index * 53;
    }
  };

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-4 h-24 flex justify-center items-center">
        <Logo />
      </div>
      <nav className="flex-1 overflow-y-auto pl-[38px] pr-4 py-4 relative">
        {/* Animated indicator */}
        {activeItemIndex !== null && (
          <div
            className="absolute left-0 w-[6px] h-[45px] bg-black rounded-r-full transition-all duration-500 ease-in-out"
            style={{
              transform: `translateY(${getItemPosition(activeItemIndex)}px)`,
            }}
          />
        )}

        <div className="flex flex-col space-y-4">
          {navigationItems.map((item, index) => (
            <SidebarNavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={index === activeItemIndex}
            />
          ))}
        </div>
      </nav>
      
      {/* Logout button at the bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full py-3 px-4 bg-black text-white font-medium rounded-lg text-center transition-opacity duration-200 hover:opacity-90 disabled:opacity-70"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
};
