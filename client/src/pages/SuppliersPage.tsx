import React, { useEffect } from "react";
import Form from "../components/CRUD/Form";
import DeleteModal from "../components/CRUD/DeleteModal";
import { createSupplier, deleteSupplier, updateSupplier, viewSupplier } from "../utils/supplierUtils";
import { ModalType, Supplier, SupplierPayload, UpdateSupplierPayload } from "../types/types";
import { UpdatePayload } from "vite/types/hmrPayload.js";

const SuppliersPage: React.FC = () => {
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
  const [makeSupplier, setMakeSupplier] = React.useState<SupplierPayload>({
    name: "",
    phone_number: "",
    email: "",
    address: "",
    country: "",
    city: "",
    postal_code: "",
  });
  const [editSupplier, setEditSupplier] = React.useState<UpdateSupplierPayload>({
    id: "",
    name: null,
    phone_number: null,
    email: null,
    address: null,
    country: null,
    city: null,
    postal_code: null,
  });
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState<ModalType>({
    valueId: "",
    show: false,
  });

  const handleAdd = async (supplier: SupplierPayload) => {
    try {
      await createSupplier(supplier);

      console.log("Added:", supplier);
      await viewSupplier(setSuppliers);
      alert("Supplier created.");
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSupplier(showDeleteModal.valueId);

      // refetch latest data update
      await viewSupplier(setSuppliers);
      alert("Supplier deleted.");
      setShowDeleteModal({ valueId: "", show: false });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (supplier: UpdateSupplierPayload) => {
    try {
      await updateSupplier(supplier);
      await viewSupplier(setSuppliers);
      alert("Supplier updated.");
      setShowEditForm(false);
      setEditSupplier({
        id: "",
        name: null,
        phone_number: null,
        email: null,
        address: null,
        country: null,
        city: null,
        postal_code: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // use effects
  useEffect(() => {
    viewSupplier(setSuppliers);
  }, []);

  useEffect(() => {
    console.log("suppliers from frontend : ", suppliers);
  }, [suppliers]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Suppliers</h1>

      {/* Buttons */}
      <div className="mb-4 flex gap-4">
        <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Add Supplier
        </button>
        {/* <button onClick={() => setShowDeleteModal(true)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete Supplier
        </button> */}
      </div>

      {/* Add Form */}
      {showAddForm && <Form<SupplierPayload, Supplier[]> datas={suppliers} task="add" item={"Supplier"} data={makeSupplier} setData={setMakeSupplier} onSubmit={handleAdd} onCancel={() => setShowAddForm(false)} />}

      {/* Edit Form */}
      {showEditForm && <Form<UpdateSupplierPayload, Supplier[]> datas={suppliers} task="update" item={"Supplier"} data={editSupplier} setData={setEditSupplier} onSubmit={handleEdit} onCancel={() => setShowEditForm(false)} />}

      {/* Delete Modal */}
      {showDeleteModal.show && <DeleteModal valueId="" onDelete={handleDelete} onCancel={() => setShowDeleteModal({ valueId: "", show: false })} />}

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
            {suppliers.length > 0 &&
              suppliers.map((supplier: Supplier, index: number) => {
                return (
                  <tr key={supplier.id || index}>
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2">{supplier.name}</td>
                    <td className="border px-4 py-2">{supplier.email}</td>
                    <td className="border px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => {
                          setEditSupplier((prev) => ({
                            ...prev,
                            id: supplier.id,
                          }));
                          setShowEditForm(true);
                        }}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteModal({ valueId: supplier.id, show: true });
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
    </div>
  );
};

export default SuppliersPage;
