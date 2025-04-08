import { useState, useEffect, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components/organisms/Sidebar";
import { Header } from "../components/organisms/Header";

/**
 * MainLayout Component
 *
 * This component serves as the primary layout structure for authenticated pages.
 * It implements a responsive layout with a fixed sidebar and a scrollable main content area.
 *
 * The layout follows the Atomic Design methodology:
 * - Organisms: Sidebar and Header components
 * - Template: This MainLayout component
 * - Pages: Individual page content passed as children
 */
interface MainLayoutProps {
  children?: ReactNode;
  title?: string;
}

export const MainLayout = ({
  children,
  title: propTitle,
}: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Determine title based on current route
  const getTitle = () => {
    const path = location.pathname;
    
    if (propTitle) return propTitle;
    
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/accounts":
        return "Accounts";
      case "/transactions":
        return "Transactions";
      case "/investments":
        return "Investments";
      case "/credit-cards":
        return "Credit Cards";
      case "/loans":
        return "Loans";
      case "/services":
        return "Services";
      case "/my-privileges":
        return "My Privileges";
      case "/settings":
        return "Settings";
      default:
        return "Overview";
    }
  };
  
  const title = getTitle();

  // Close mobile menu when clicking outside or pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".mobile-sidebar") &&
        !target.closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen bg-white lg:bg-gray-50 dark:bg-gray-950">
      {/* Fixed sidebar navigation - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out mobile-sidebar md:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header with user controls */}
        <Header title={title} onMenuClick={toggleMenu} />

        {/* Main content area with automatic scrolling */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
