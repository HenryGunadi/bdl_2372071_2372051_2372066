import { useEffect, useState } from "react";
import { ModalType, PO, CreatePO, UpdatePO } from "../types/types";
import Form from "../components/CRUD/Form";
import DeleteModal from "../components/CRUD/DeleteModal";
import { handlePagination, resetState } from "../utils/commonUtils";
import { createPO, deletePO, updatePO, viewPO } from "../utils/poUtils";

const POPage = () => {
  const [pos, setPOS] = useState<PO[]>([]);
  const [makePO, setMakePO] = useState<CreatePO>({
    payment_method: "",
    currency: "",
    total_subtotal: 0,
    total_discount: 0,
    total_tax: 0,
    total_amount_due: 0,
    items: [],
    supplier_id: "",
    status: "",
  });
  const [editPO, setEditPO] = useState<UpdatePO>({
    id: "",
    payment_method: null,
    currency: null,
    total_subtotal: null,
    total_discount: null,
    total_tax: null,
    total_amount_due: null,
    supplier_id: null,
    status: null,
  });
  const [currentPage, setPage] = useState<number>(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<ModalType>({
    valueId: "",
    show: false,
  });
  const poPerPage = 5;
  // Calculate index for pagination
  const currentIndex = (currentPage - 1) * poPerPage;

  // helpers
  const handleAdd = async () => {
    try {
      await createPO(makePO);
      await viewPO(setPOS);
      setShowAddForm(false);
      alert("Purchase order has been created.");
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePO(showDeleteModal.valueId);
      await viewPO(setPOS);
      alert("Purchase order deleted.");
      setShowDeleteModal({
        valueId: "",
        show: false,
      });
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  const handleUpdate = async () => {
    try {
      await updatePO(editPO);
      await viewPO(setPOS);
      alert("Purchase order updated.");
      setShowEditForm(false);
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  // View admins on page load
  useEffect(() => {
    viewPO(setPOS);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Purchase Order</h1>
        <p className="text-sm text-gray-500 mb-4">Manage and track your purchase orders here.</p>

        {/* Add User Button */}
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            onClick={() => {
              setShowAddForm(true);
            }}
          >
            + Add Purchase Order
          </button>
          <input type="text" placeholder="Search" className="border border-gray-300 rounded-lg px-4 py-2 w-64" />
        </div>

        {/* Add Form */}
        {showAddForm && (
          <Form<CreatePO, PO[]>
            datas={pos}
            task="add"
            item={"Purchase Order"}
            data={makePO}
            setData={setMakePO}
            onSubmit={handleAdd}
            onCancel={() => {
              setShowAddForm(false);
              resetState<CreatePO>(setMakePO, makePO);
            }}
          />
        )}

        {/* Edit Form */}
        {showEditForm && (
          <Form<UpdatePO, PO[]>
            datas={pos}
            task="update"
            item={"Purchase Order"}
            data={editPO}
            setData={setEditPO}
            onSubmit={handleUpdate}
            onCancel={() => {
              resetState<UpdatePO>(setEditPO, editPO);
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
                <th className="border border-gray-300 px-4 py-2">PO ID</th>
                <th className="border border-gray-300 px-4 py-2">Payment Method</th>
                <th className="border border-gray-300 px-4 py-2">Supplier</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pos.slice(currentIndex, currentIndex + poPerPage).map((po, index) => {
                return (
                  <tr key={po.id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{po.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{po.payment_method}</td>
                    <td className="border border-gray-300 px-4 py-2">{po.supplier_id}</td>
                    <td className="border border-gray-300 px-4 py-2">{po.status}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 mr-2"
                        onClick={() => {
                          setEditPO((prev) => ({
                            ...prev,
                            id: po.id,
                          }));
                          setShowEditForm(true);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600"
                        onClick={() => {
                          setShowDeleteModal({ valueId: po.id, show: true });
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
            Showing {currentIndex + 1} to {Math.min(currentIndex + poPerPage, pos.length)} of {pos.length} entries
          </span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300" onClick={() => handlePagination<PO>("prev", pos, currentPage, setPage)}>
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">{currentPage}</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => handlePagination<PO>("prev", pos, currentPage, setPage)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POPage;
