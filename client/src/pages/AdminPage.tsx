import { useEffect, useState } from "react";
import { Admin, ModalType, AdminPayload, CreateAdmin } from "../types/types";
import { createAdmin, deleteAdmin, updateAdmin, viewAdmin } from "../utils/adminUtils";
import Form from "../components/CRUD/Form";
import DeleteModal from "../components/CRUD/DeleteModal";
import { handlePagination, resetState } from "../utils/commonUtils";

const AdminPage = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [currentPage, setPage] = useState<number>(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<ModalType>({
    valueId: "",
    show: false,
  });
  const [makeAdmin, setMakeAdmin] = useState<CreateAdmin>({
    name: "",
    password: "",
    email: "",
    phone_number: "",
    role: "",
  });
  const [editAdmin, setEditAdmin] = useState<AdminPayload>({
    id: "",
    name: null,
    password: null,
    email: null,
    phone_number: null,
    role: null,
  });

  const adminsPerPage = 5;

  // Calculate index for pagination
  const currentIndex = (currentPage - 1) * adminsPerPage;

  // helpers
  const handleAdd = async () => {
    try {
      await createAdmin(makeAdmin);

      console.log("Admin added : ", makeAdmin);
      await viewAdmin(setAdmins);
      alert("Admin created.");
      resetState<CreateAdmin>(setMakeAdmin, makeAdmin);
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteAdmin(showDeleteModal.valueId);

      console.log(res);
      await viewAdmin(setAdmins);
      setShowDeleteModal({ valueId: "", show: false });
      alert("Admin deleted.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleUpdate = async (admin: AdminPayload) => {
    try {
      const res = await updateAdmin(admin);

      console.log(res);
      await viewAdmin(setAdmins);
      await setShowEditForm(false);
      resetState<AdminPayload>(setEditAdmin, editAdmin);
      alert("Admin updated.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // View admins on page load
  useEffect(() => {
    viewAdmin(setAdmins);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Admins</h1>
        <p className="text-sm text-gray-500 mb-4">Pengguna / Karyawan</p>

        {/* Add User Button */}
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            onClick={() => {
              setShowAddForm(true);
            }}
          >
            + Add User
          </button>
          <input type="text" placeholder="Search" className="border border-gray-300 rounded-lg px-4 py-2 w-64" />
        </div>

        {/* Add Form */}
        {showAddForm && (
          <Form<CreateAdmin, Admin[], {}, {}>
            datas={admins}
            task="add"
            page="admin"
            item={"Admin"}
            data={makeAdmin}
            setData={setMakeAdmin}
            onSubmit={handleAdd}
            onCancel={() => {
              setShowAddForm(false);
              resetState<CreateAdmin>(setMakeAdmin, makeAdmin);
            }}
          />
        )}

        {/* Edit Form */}
        {showEditForm && (
          <Form<AdminPayload, Admin[], {}, {}>
            page="admin"
            datas={admins}
            task="update"
            item={"Admin"}
            data={editAdmin}
            setData={setEditAdmin}
            onSubmit={handleUpdate}
            onCancel={() => {
              resetState<AdminPayload>(setEditAdmin, editAdmin);
              setShowEditForm(false);
            }}
          />
        )}

        {/* Delete Modal */}
        {showDeleteModal.show && <DeleteModal valueId="" onDelete={handleDelete} onCancel={() => setShowDeleteModal({ valueId: "", show: false })} />}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.slice(currentIndex, currentIndex + adminsPerPage).map((admin, index) => {
                return (
                  <tr key={admin.id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{admin.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{admin.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{admin.phone_number}</td>
                    <td className="border border-gray-300 px-4 py-2">{admin.role}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 mr-2"
                        onClick={() => {
                          setEditAdmin((prev) => ({
                            ...prev,
                            id: admin.id,
                          }));
                          setShowEditForm(true);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600"
                        onClick={() => {
                          setShowDeleteModal({ valueId: admin.id, show: true });
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            Showing {currentIndex + 1} to {Math.min(currentIndex + adminsPerPage, admins.length)} of {admins.length} entries
          </span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300" onClick={() => handlePagination("prev", admins, currentPage, setPage)}>
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">{currentPage}</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => handlePagination("prev", admins, currentPage, setPage)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
