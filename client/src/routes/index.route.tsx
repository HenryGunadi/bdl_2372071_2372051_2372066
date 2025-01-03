import { BrowserRouter, Route, Routes } from "react-router-dom";
import Item from "../pages/Item";
import Home from "../pages/Home";
import ItemDashboard from "../pages/ItemDashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<Item />} />
        <Route path="/item_dashboard" element={<ItemDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
