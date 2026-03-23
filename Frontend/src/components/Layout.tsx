import { Outlet, Link, useLocation } from "react-router-dom";
import { useConfigStore } from "../store/useConfigStore";
import { LayoutDashboard, FilePlus, FileText, Settings } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const Layout = () => {
  const config = useConfigStore((state) => state.config);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/results/create", label: "Create Result", icon: <FilePlus size={20} /> },
    { path: "/results", label: "All Results", icon: <FileText size={20} /> },
    { path: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex text-gray-900 dark:text-gray-100 transition-colors">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-sm flex flex-col transition-colors">
        <div 
          className="p-6 h-20 flex items-center justify-center border-b"
          style={{ backgroundColor: config?.themeColor || '#043927' }}
        >
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
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 h-20 px-8 flex items-center justify-between shadow-sm transition-colors">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{config?.schoolName}</h2>
          <ModeToggle />
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
