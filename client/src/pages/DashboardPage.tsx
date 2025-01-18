import { useEffect, useState } from "react";
import { BarChartComponent } from "../components/ui/BarChart";
import { Admin, AllItems, PO, PODetails, ReceiptDetail, Supplier } from "../types/types";
import { fetchItems } from "../utils/Item";
import { viewSupplier } from "../utils/supplierUtils";
import { viewAdmin } from "../utils/adminUtils";
import { viewPO, viewPODetails } from "../utils/poUtils";
import { viewReceiptDetails } from "../utils/receiptUtils";
import { Package } from "lucide-react";

const DashboardPage = () => {
  const [items, setItems] = useState<AllItems[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [users, setUsers] = useState<Admin[]>([]);
  const [pos, setPOs] = useState<PO[]>([]);
  const [receipts, setReceipts] = useState<ReceiptDetail[]>([]);
  const [top6Receipts, setTop6Receipts] = useState<any[]>([]);

  // Function to get the top 6 receipts by total this month
  const getTop6ReceiptsByTotal = (receiptData: ReceiptDetail[]) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Group receipts by items_id and sum their total
    const groupedReceipts = receiptData
      .filter((receipt) => {
        if (!receipt.created_at) return false;
        const date = new Date(receipt.created_at);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      })
      .reduce((acc, receipt) => {
        const existing = acc[receipt.items_id];
        if (existing) {
          existing.total += receipt.total; // Sum the total for each items_id
        } else {
          acc[receipt.items_id] = { name: receipt.items_id, total: receipt.total };
        }
        return acc;
      }, {} as { [key: string]: { name: string; total: number } });

    // Convert the grouped object to an array, sort by total, and return the top 6
    return Object.values(groupedReceipts)
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);
  };

  useEffect(() => {
    fetchItems(setItems);
    viewSupplier(setSuppliers);
    viewAdmin(setUsers);
    viewPO(setPOs);
    viewReceiptDetails(setReceipts);
  }, []);

  useEffect(() => {
    if (receipts.length > 0) {
      setTop6Receipts(getTop6ReceiptsByTotal(receipts));
    }
  }, [receipts]);

  const stats = [
    { label: "ITEMS", value: items.length, color: "bg-blue-500", icon: "🛍️" },
    { label: "SUPPLIERS", value: suppliers.length, color: "bg-red-500", icon: <Package className="h-8 w-8" /> },
    { label: "Ongoing POS", value: pos.filter((po) => po.status === "ongoing").length, color: "bg-green-500", icon: "🚚" },
    { label: "USERS", value: users.length, color: "bg-orange-500", icon: "👥" },
  ];

  return (
    <div className="w-full h-full bg-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mb-4">Control panel</p>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className={`flex items-center justify-between p-4 rounded-lg shadow ${stat.color} text-white`}>
            <div>
              <p className="text-sm">{stat.label}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>
            <div className="text-4xl">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="px-6 w-full">
        <div className="bg-white p-6 rounded-lg shadow w-full">
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <div className="w-full flex">
            <BarChartComponent data={top6Receipts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
