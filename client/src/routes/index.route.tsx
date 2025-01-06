import { BrowserRouter, Route, Routes } from "react-router-dom";
import Item from "../pages/Item";
import Home from "../pages/Home";
import DashboardPage from "../pages/DashboardPage";
import ItemDashboard from "../pages/ItemDashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import UserPage from "../pages/UserPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Bungkus semua routes dengan DashboardLayout */}
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          }
        />
        <Route
          path="/item"
          element={
            <DashboardLayout>
              <Item />
            </DashboardLayout>
          }
        />
        <Route
          path="/item_dashboard"
          element={
            <DashboardLayout>
              <ItemDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard_page"
          element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/user"
          element={
            <DashboardLayout>
              <UserPage />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
