import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuppliersPage from "../pages/SuppliersPage";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../pages/Home";
import ItemDashboard from "../pages/ItemDashboard";
import AdminPage from "../pages/AdminPage";
import POPage from "../pages/POPage";
import InventoryPage from "../pages/InventoryPage";
import TaxPage from "../pages/TaxPage";
import ReceiptPage from "../pages/ReceiptPage";
import LoginPage from "../pages/LoginPage";
import CategoryPage from "../pages/CategoryPage";
import PrivateRoute from "../components/PrivateRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute path="/">
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <PrivateRoute path="/suppliers">
              <DashboardLayout>
                <SuppliersPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/items"
          element={
            <PrivateRoute path="/items">
              <DashboardLayout>
                <ItemDashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admins"
          element={
            <PrivateRoute path="/admins">
              <DashboardLayout>
                <AdminPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/purchase_order"
          element={
            <PrivateRoute path="/purchase_order">
              <DashboardLayout>
                <POPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <PrivateRoute path="/inventory">
              <DashboardLayout>
                <InventoryPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/tax"
          element={
            <PrivateRoute path="/tax">
              <DashboardLayout>
                <TaxPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <PrivateRoute path="/transaction">
              <DashboardLayout>
                <ReceiptPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRoute path="/category">
              <DashboardLayout>
                <CategoryPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
