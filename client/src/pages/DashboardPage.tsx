
const DashboardPage = () => {
  const stats = [
    { label: "ITEMS", value: 6, color: "bg-blue-500", icon: "🛍️" },
    { label: "SUPPLIERS", value: 4, color: "bg-red-500", icon: "🚚" },
    { label: "CUSTOMERS", value: 3, color: "bg-green-500", icon: "👥" },
    { label: "USERS", value: 3, color: "bg-orange-500", icon: "➕" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mb-4">Control panel</p>

        {/* Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg shadow ${stat.color} text-white`}
            >
              <div>
                <p className="text-sm">{stat.label}</p>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Produk Terlaris Bulan Ini</h2>
          {/* Chart Placeholder */}
          <div className="h-64 bg-blue-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">[Chart Placeholder]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
