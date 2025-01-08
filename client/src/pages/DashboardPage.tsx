import { BarChartComponent } from "../components/ui/BarChart";

const DashboardPage = () => {
  const stats = [
    { label: "ITEMS", value: 6, color: "bg-blue-500", icon: "🛍️" },
    { label: "SUPPLIERS", value: 4, color: "bg-red-500", icon: "🚚" },
    { label: "CUSTOMERS", value: 3, color: "bg-green-500", icon: "👥" },
    { label: "USERS", value: 3, color: "bg-orange-500", icon: "➕" },
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
          {/* Chart Placeholder */}
          <div className="w-full flex">
            <BarChartComponent></BarChartComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
