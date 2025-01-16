import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface MenuItemProps {
  icon: string;
  label: string;
  badge?: number;
  hasSubmenu?: boolean;
  to: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, badge, hasSubmenu, to }) => {
  return (
    <NavLink to={to} className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer ${isActive ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`}>
      <div className="flex items-center gap-2">
        <i className={`fa-solid ${icon}`}></i>
        <span>{label}</span>
      </div>
      {badge && <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">{badge}</div>}
      {hasSubmenu && <i className="fa-solid fa-chevron-right text-sm text-gray-400"></i>}
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"admin" | "manager" | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role") as "admin" | "manager";
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <div className="bg-gray-800 w-64 min-h-screen text-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex flex-col items-center border-b border-gray-700">
        <img src="./assets/user.png" alt="Admin" className="rounded-full w-12 h-12 mb-2" />
        <h3 className="text-white font-semibold">{role === "manager" ? "Manager" : "Admin"}</h3>
        <p className="text-green-400 text-sm">Online</p>
      </div>

      {/* Menu */}
      <div className="p-4 space-y-4">
        <div className="text-gray-400 uppercase text-xs">Main Menu</div>
        <MenuItem icon="fa-tachometer-alt" label="Dashboard" to="/" />
        <MenuItem icon="fa-truck" label="Suppliers" to="/suppliers" />
        <MenuItem icon="fa-users" label="Tax" to="/tax" />
        <MenuItem icon="fa-box" label="Inventory" hasSubmenu to="/inventory" />
        <MenuItem icon="fa-chart-pie" label="Items" hasSubmenu to="/items" />
        <MenuItem icon="fa-chart-pie" label="Transaction" hasSubmenu to="/transaction" />
        <MenuItem icon="fa-chart-pie" label="Category" hasSubmenu to="/category" />

        {/* Purchase Order (only for managers) */}
        {role === "manager" && <MenuItem icon="fa-shopping-cart" label="Purchase Order" hasSubmenu to="/purchase_order" />}

        {/* Users / Employees (only for managers) */}
        {role === "manager" && <MenuItem icon="fa-user-friends" label="Users / Employees" to="/admins" />}
      </div>

      {/* Logout Button */}
      <div className="p-4 mt-auto border-t border-gray-700">
        <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg flex items-center gap-2">
          <i className="fa-solid fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
