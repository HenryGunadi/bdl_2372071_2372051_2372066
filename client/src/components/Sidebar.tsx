import React from "react";
import { NavLink } from "react-router-dom";

interface MenuItemProps {
  icon: string;
  label: string;
  badge?: number;
  hasSubmenu?: boolean;
  to: string; // Tambahkan properti untuk link
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, badge, hasSubmenu, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer ${
          isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
        }`
      }
    >
      <div className="flex items-center gap-2">
        <i className={`fa-solid ${icon}`}></i>
        <span>{label}</span>
      </div>
      {badge && (
        <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </div>
      )}
      {hasSubmenu && <i className="fa-solid fa-chevron-right text-sm text-gray-400"></i>}
    </NavLink>
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
        <MenuItem icon="fa-tachometer-alt" label="Dashboard" to="/" />
        <MenuItem icon="fa-truck" label="Suppliers" badge={4} to="/suppliers" />
        <MenuItem icon="fa-users" label="Customers" badge={3} to="/customers" />
        <MenuItem icon="fa-box" label="Products" hasSubmenu to="/products" />
        <MenuItem icon="fa-shopping-cart" label="Transaction" hasSubmenu to="/transactions" />
        <MenuItem icon="fa-chart-pie" label="Reports" hasSubmenu to="/reports" />

        <div className="text-gray-400 uppercase text-xs pt-4">Settings</div>
        <MenuItem icon="fa-user-friends" label="Users / Employees" badge={3} to="/users" />
        <MenuItem icon="fa-cogs" label="Configuration" to="/configuration" />
      </div>
    </div>
  );
};

export default Sidebar;
