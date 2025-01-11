import { useEffect, useState } from "react";
import { ModalType, PO, CreatePO, UpdatePO, Supplier, Items, AllItems, PODetailPayload } from "../types/types";
import Form from "../components/CRUD/Form";
import { createPO, deletePO, updatePO, viewPO } from "../utils/poUtils";
import { columns, DataTable } from "../components/table/Table";
import { viewSupplier } from "../utils/supplierUtils";
import Combobox from "../components/ui/Combobox";
import POModal from "../components/CRUD/POModal";
import { fetchItems } from "../utils/Item";

const POPage = () => {
  const [showAddItem, setShowAddItem] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
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
    status: "ongoing",
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
  const [items, setItems] = useState<AllItems[]>([]);
  const [openPOItemModal, setOpenPOItemModal] = useState<boolean>(false);

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

  const handleShowAddItem = () => {
    if (!makePO.supplier_id) {
      alert("Please select a supplier first.");
      return;
    }
    setOpenPOItemModal(true);
  };

  // View admins on page load
  useEffect(() => {
    viewPO(setPOS);
    viewSupplier(setSuppliers);
    fetchItems(setItems);
  }, []);

  useEffect(() => {
    console.log("ITEMS IN PO ", items);
  }, [items]);

  const handleAddPOItem = (POItem: PODetailPayload) => {
    setMakePO((prev) => ({
      ...prev,
      items: [...prev.items, POItem], // Create a new array with the previous items and the new POItem
    }));
  };

  useEffect(() => {
    if (makePO.items.length > 0) {
      let subtotal = 0;
      let discount = 0;
      let tax = 0;

      makePO.items.forEach((item) => {
        subtotal += item.quantity * item.unit_price;

        discount += item.quantity * item.discount;

        tax += (item.quantity * item.unit_price - item.discount) * 0.1;
      });

      const amountDue = subtotal - discount + tax;

      setMakePO((prevPO) => ({
        ...prevPO,
        total_subtotal: subtotal,
        total_discount: discount,
        total_tax: tax,
        total_amount_due: amountDue,
      }));

      console.log("PO UPDATED: ", makePO);
    }
  }, [makePO.items]);

  useEffect(() => {
    console.log("PO UPDATED: ", makePO);
  }, [makePO]); // This will log the updated state after makePO is updated

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* <Combobox data={} onSelect={}></Combobox> */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Purchase Order</h1>
        <p className="text-sm text-gray-500 mb-4">Manage and track your purchase orders here.</p>

        {/* Buttons */}
        <div className="mb-4 flex gap-4">
          <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            + Add Purchase Order
          </button>
          {/* <button onClick={() => setShowDeleteModal(true)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete Supplier
        </button> */}
        </div>

        <POModal open={openPOItemModal} setOpen={setOpenPOItemModal} data={items} supplier_id={makePO.supplier_id} onSubmit={handleAddPOItem}></POModal>

        {/* Add Form */}
        {showAddForm && (
          <Form<CreatePO, PO[], {}, {}>
            modal={handleShowAddItem}
            datas3={makePO.items}
            datas2={suppliers}
            datas={pos}
            page="po"
            task="add"
            item={"Purchase Order"}
            data={makePO}
            setData={setMakePO}
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <DataTable columns={columns} data={pos} filter="id"></DataTable>
      </div>
    </div>
  );
};

export default POPage;
