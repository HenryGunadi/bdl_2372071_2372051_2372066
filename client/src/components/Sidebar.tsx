import React from "react";

interface MenuItemProps {
  icon: string;
  label: string;
  badge?: number;
  hasSubmenu?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, badge, hasSubmenu }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-700 rounded-lg cursor-pointer">
      <div className="flex items-center gap-2 text-white">
        <i className={`fa-solid ${icon}`}></i>
        <span>{label}</span>
      </div>
      {badge && (
        <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">{badge}</div>
      )}
      {hasSubmenu && <i className="fa-solid fa-chevron-right text-sm text-gray-400"></i>}
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 w-64 min-h-screen text-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex flex-col items-center border-b border-gray-700">
        <img
          src="https://via.placeholder.com/40"
          alt="Admin"
          className="rounded-full w-12 h-12 mb-2"
        />
        <h3 className="text-white font-semibold">Admin</h3>
        <p className="text-green-400 text-sm">Online</p>
      </div>

      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 text-sm text-gray-200 bg-gray-700 rounded-lg placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Menu */}
      <div className="p-4 space-y-4">
        <div className="text-gray-400 uppercase text-xs">Main Menu</div>
        <MenuItem icon="fa-tachometer-alt" label="Dashboard" />
        <MenuItem icon="fa-truck" label="Suppliers" badge={4} />
        <MenuItem icon="fa-users" label="Customers" badge={3} />
        <MenuItem icon="fa-box" label="Products" hasSubmenu />
        <MenuItem icon="fa-shopping-cart" label="Transaction" hasSubmenu />
        <MenuItem icon="fa-chart-pie" label="Reports" hasSubmenu />

        <div className="text-gray-400 uppercase text-xs pt-4">Settings</div>
        <MenuItem icon="fa-user-friends" label="Users / Employees" badge={3} />
        <MenuItem icon="fa-cogs" label="Configuration" />
      </div>
    </div>
  );
};

export default Sidebar;
