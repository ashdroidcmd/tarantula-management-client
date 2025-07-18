import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`drawer lg:drawer-open min-h-screen`}>
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      {/* Sidebar */}
      <div className={`drawer-side`}>
        <label
          htmlFor="admin-drawer"
          className="drawer-overlay lg:hidden"
        ></label>
        <div
          className={`min-h-screen border-e border-e-gray-700 bg-zinc-900 transition-all duration-300 ${collapsed ? 'w-20' : 'w-80'}`}
        >
          {/* Collapse Button */}
          <div className="border-b border-b-gray-700 py-4 pl-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="btn btn-sm btn-ghost py-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu-icon lucide-menu"
              >
                <path d="M4 12h16" />
                <path d="M4 18h16" />
                <path d="M4 6h16" />
              </svg>
            </button>
          </div>
          <Sidebar collapsed={collapsed} />
        </div>
      </div>

      {/* Main Content */}
      <div className={`drawer-content bg-gray-950 text-white`}>
        <Navbar />
        <div className="p-4">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;