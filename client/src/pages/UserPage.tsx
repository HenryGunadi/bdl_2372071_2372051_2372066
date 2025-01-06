import { useState } from "react";

const UserPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "admin",
      name: "Mohammad Nur Fawaiq",
      address: "Pati, Indonesia",
      level: "Admin",
    },
    {
      id: 2,
      username: "kasir1",
      name: "Anggita",
      address: "Semarang",
      level: "Kasir",
    },
    {
      id: 3,
      username: "kasir2",
      name: "Steven",
      address: "Kudus",
      level: "Kasir",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <p className="text-sm text-gray-500 mb-4">Pengguna / Karyawan</p>

        {/* Add User Button */}
        <div className="flex justify-between items-center mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
            + Add User
          </button>
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg px-4 py-2 w-64"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Level</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.address}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        user.level === "Admin" ? "bg-blue-500" : "bg-gray-500"
                      }`}
                    >
                      {user.level}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 mr-2">
                      Update
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            Showing 1 to {users.length} of {users.length} entries
          </span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              1
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
