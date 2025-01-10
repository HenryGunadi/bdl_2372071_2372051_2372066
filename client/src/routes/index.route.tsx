import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuppliersPage from "../pages/SuppliersPage";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../pages/Home";
import ItemDashboard from "../pages/ItemDashboard";
import AdminPage from "../pages/AdminPage";
import POPage from "../pages/POPage";

// Tambahkan halaman lainnya di sini.

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          }
        />
        <Route
          path="/suppliers"
          element={
            <DashboardLayout>
              <SuppliersPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/items"
          element={
            <DashboardLayout>
              <ItemDashboard />
            </DashboardLayout>
          }
        />
        {/* only admin can access this route */}
        <Route
          path="/admins"
          element={
            <DashboardLayout>
              <AdminPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/purchase_order"
          element={
            <DashboardLayout>
              <POPage />
            </DashboardLayout>
          }
        />

        {/* Tambahkan routing lainnya di sini */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
