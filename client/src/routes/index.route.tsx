import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuppliersPage from "../pages/SuppliersPage";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../pages/Home";

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

        {/* Tambahkan routing lainnya di sini */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
