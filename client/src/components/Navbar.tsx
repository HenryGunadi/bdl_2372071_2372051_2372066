import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4 text-white">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/add-product">Add Product</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
