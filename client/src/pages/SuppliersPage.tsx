import React from "react";
import AddForm from "../components/CRUD/AddForm";
import EditForm from "../components/CRUD/EditForm";
import DeleteModal from "../components/CRUD/DeleteModal";

const SuppliersPage: React.FC = () => {
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleAdd = (data: { name: string; email: string }) => {
    console.log("Added:", data);
    setShowAddForm(false);
  };

  const handleEdit = (data: { id: number; name: string; email: string }) => {
    console.log("Edited:", data);
    setShowEditForm(false);
  };

  const handleDelete = () => {
    console.log("Deleted");
    setShowDeleteModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Suppliers</h1>

      {/* Buttons */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Supplier
        </button>
        <button
          onClick={() => setShowEditForm(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Edit Supplier
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete Supplier
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && <AddForm onSubmit={handleAdd} onCancel={() => setShowAddForm(false)} />}

      {/* Edit Form */}
      {showEditForm && (
        <EditForm
          data={{ id: 1, name: "Supplier A", email: "supplierA@example.com" }}
          onSubmit={handleEdit}
          onCancel={() => setShowEditForm(false)}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          itemName="Supplier A"
          onDelete={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Supplier List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-center">1</td>
              <td className="border px-4 py-2">Supplier A</td>
              <td className="border px-4 py-2">supplierA@example.com</td>
              <td className="border px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => setShowEditForm(true)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuppliersPage;
