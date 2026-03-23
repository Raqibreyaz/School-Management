import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useConfigStore } from "../store/useConfigStore";
import { LayoutDashboard, FilePlus, FileText, Settings, Menu, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const config = useConfigStore((state) => state.config);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/results/create", label: "Create Result", icon: <FilePlus size={20} /> },
    { path: "/results", label: "All Results", icon: <FileText size={20} /> },
    { path: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex text-gray-900 dark:text-gray-100 transition-colors overflow-hidden relative">
      {/* Mobile Overlay Background */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-sm flex flex-col`}>
        <div 
          className="p-6 h-20 flex items-center justify-center border-b relative"
          style={{ backgroundColor: config?.themeColor || '#043927' }}
        >
          {/* Mobile Close Button */}
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden text-white bg-black/20 hover:bg-black/30 p-1 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
          {config?.logoUrl ? (
            <img src={config.logoUrl} alt="Logo" className="h-12 w-auto object-contain bg-white rounded-sm p-1" />
          ) : (
            <h1 className="text-xl font-bold text-white tracking-tight truncate px-2">{config?.schoolName || "Result Maker"}</h1>
          )}
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${
                  isActive 
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col w-full">
        <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 h-20 px-4 md:px-8 flex items-center justify-between shadow-sm transition-colors sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white truncate max-w-45 sm:max-w-md">{config?.schoolName}</h2>
          </div>
          <ModeToggle />
        </header>
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
