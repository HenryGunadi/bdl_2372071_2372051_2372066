import { useEffect, useState } from "react";
import { DataTable, inventoryColumns } from "../components/table/Table";
import { Inventory, InventoryPayload } from "../types/types";
import { updateInventory, viewInventories } from "../utils/inventoryUtils";
import Form from "../components/CRUD/Form";
import { resetState } from "../utils/commonUtils";

export default function InventoryPage() {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [editInventory, setEditInventory] = useState<InventoryPayload>({
    item_id: "",
    quantity: 0,
    exp_date: null,
  });
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  async function handleUpdateInventory() {
    try {
      await updateInventory(editInventory);
    } catch (err) {
      console.error(err);
    }
  }

  function toggleModal(itemID: string) {
    const filteredInventory = inventories.filter((inventory) => inventory.item_id === itemID);
    console.log("EXP DATE: ", filteredInventory[0].exp_date);
    console.log("ID INVENT FRONTEND : ", itemID);

    setShowEditModal(true);
    setEditInventory({
      item_id: filteredInventory[0].item_id,
      quantity: filteredInventory[0].quantity,
      exp_date: filteredInventory[0].exp_date,
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

        {/* Buttons */}
        <div className="mb-4 flex gap-4">
          {/* <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            + Add Item
          </button> */}
          {/* <button onClick={() => setShowDeleteModal(true)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete Supplier
        </button> */}
        </div>

        <DataTable columns={inventoryColumns(toggleModal)} data={inventories} filter="exp_date" placeholder="Search by exp_date"></DataTable>
      </div>
    </div>
  );
}
