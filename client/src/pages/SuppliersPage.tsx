import React, { useEffect, useState } from "react";
import Form from "../components/CRUD/Form";
import DeleteModal from "../components/CRUD/DeleteModal";
import { createSupplier, deleteSupplier, updateSupplier, viewSupplier } from "../utils/supplierUtils";
import { ModalType, Supplier, SupplierPayload, UpdateSupplierPayload } from "../types/types";
import { resetState } from "../utils/commonUtils";
import SupplierDetailModal from "../components/SupplierDetailModal";

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
  const [toggleDetail, setToggleDetail] = useState<{
    supplier: Supplier | null;
    show: boolean;
  }>({
    supplier: null,
    show: true,
  });

  function handleToggleDetail(supplierID: string) {
    if (suppliers.length > 0) {
      const selectedSupplier = suppliers.filter((supplier) => supplier.id === supplierID)[0];

      setToggleDetail({
        supplier: selectedSupplier,
        show: true,
      });
    }
  }

  function CloseToggleDetail() {
    setToggleDetail({
      supplier: null,
      show: false,
    });
  }

  const handleAdd = async (supplier: SupplierPayload) => {
    try {
      await createSupplier(supplier);

      console.log("Added:", supplier);
      await viewSupplier(setSuppliers);
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
      setShowDeleteModal({ valueId: "", show: false });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (supplier: UpdateSupplierPayload) => {
    try {
      await updateSupplier(supplier);
      await viewSupplier(setSuppliers);
      setShowEditForm(false);
      resetState(setEditSupplier, editSupplier);
    } catch (err) {
      console.error(err);
    }
  };

  function handleUpdate(id: string) {
    const filteredSupplier = suppliers.filter((supplier) => supplier.id === id);
    console.log("Filtered supplier : ", filteredSupplier);

    if (suppliers.length > 0) {
      setEditSupplier({
        id: id,
        name: filteredSupplier[0].name,
        phone_number: filteredSupplier[0].phone_number,
        email: filteredSupplier[0].email,
        address: filteredSupplier[0].address,
        country: filteredSupplier[0].country,
        city: filteredSupplier[0].city,
        postal_code: filteredSupplier[0].postal_code,
      });
    }
  }

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
      {showAddForm && <Form<SupplierPayload, Supplier[], {}, {}> page="supplier" datas={suppliers} task="add" item={"Supplier"} data={makeSupplier} setData={setMakeSupplier} onSubmit={handleAdd} onCancel={() => setShowAddForm(false)} />}

      {/* Edit Form */}
      {showEditForm && (
        <Form<UpdateSupplierPayload, Supplier[], {}, {}> page="supplier" datas={suppliers} task="update" item={"Supplier"} data={editSupplier} setData={setEditSupplier} onSubmit={handleEdit} onCancel={() => setShowEditForm(false)} />
      )}

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
                  <tr key={supplier.id || index} onClick={() => handleToggleDetail(supplier.id)} className="hover:cursor-pointer z-10">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2">{supplier.name}</td>
                    <td className="border px-4 py-2">{supplier.email}</td>
                    <td className="border px-4 py-2 text-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents triggering row click event
                          console.log("SUPPLIER ID : ", supplier.id);
                          setShowEditForm(true);
                          handleUpdate(supplier.id);
                        }}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 z-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents triggering row click event
                          setShowDeleteModal({ valueId: supplier.id, show: true });
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 z-50"
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

      {/* Supplier Detail Modal */}
      {toggleDetail.show && <SupplierDetailModal supplier={toggleDetail.supplier} isOpen={toggleDetail.show} onClose={CloseToggleDetail} />}
    </div>
  );
};

export default SuppliersPage;
