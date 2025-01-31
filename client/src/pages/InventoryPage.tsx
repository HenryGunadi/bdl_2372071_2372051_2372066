import { useEffect, useState } from "react";
import { DataTable, inventoryColumns } from "../components/table/Table";
import { Inventory, InventoryPayload } from "../types/types";
import { deleteInventory, updateInventory, viewInventories } from "../utils/inventoryUtils";
import Form from "../components/CRUD/Form";
import { resetState } from "../utils/commonUtils";
import DeleteModal from "../components/CRUD/DeleteModal";

export default function InventoryPage() {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [editInventory, setEditInventory] = useState<InventoryPayload>({
    item_id: "",
    quantity: 0,
  });
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<{ id: string; show: boolean }>({
    id: "",
    show: false,
  });

  async function handleUpdateInventory() {
    try {
      await updateInventory(editInventory);
    } catch (err) {
      console.error(err);
    }
  }

  function toggleModal(itemID: string) {
    const filteredInventory = inventories.filter((inventory) => inventory.item_id === itemID);
    console.log("ID INVENT FRONTEND : ", itemID);

    setShowEditModal(true);
    setEditInventory({
      item_id: filteredInventory[0].item_id,
      quantity: filteredInventory[0].quantity,
    });
  }

  function toggleDeleteModal(itemID: string) {
    setShowDeleteModal({
      id: itemID,
      show: true,
    });
  }

  useEffect(() => {
    viewInventories(setInventories);
  }, []);

  return (
    <div className="mih-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory</h1>
        <p className="text-sm text-gray-500 mb-4">Inventory Dashboard</p>

        {/* Edit Form */}
        {showEditModal && (
          <Form<InventoryPayload, Inventory[], {}, {}>
            datas={inventories}
            task="update"
            page="inventory"
            item={"Inventory"}
            data={editInventory}
            setData={setEditInventory}
            onSubmit={handleUpdateInventory}
            onCancel={() => {
              setShowEditModal(false);
              resetState(setEditInventory, editInventory);
            }}
          />
        )}

        {/* Delete Alert */}
        {showDeleteModal.show && (
          <DeleteModal
            valueId={showDeleteModal.id}
            onDelete={() => {
              deleteInventory(showDeleteModal.id);
            }}
            onCancel={() => {
              resetState(setShowDeleteModal, showDeleteModal);
            }}
          />
        )}

        {/* Buttons */}
        <div className="mb-4 flex gap-4">
          {/* <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            + Add Item
          </button> */}
          {/* <button onClick={() => setShowDeleteModal(true)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete Supplier
        </button> */}
        </div>

        <DataTable columns={inventoryColumns(toggleModal, toggleDeleteModal)} data={inventories} filter="nama" placeholder="Search by item name"></DataTable>
      </div>
    </div>
  );
}
