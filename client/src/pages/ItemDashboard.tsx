import { useEffect, useState } from "react";
import { AllItems, Category, CreateItemPayload, Items, Supplier, UpdateItemPayload } from "../types/types";
import { createItem, fetchItems, updateItem } from "../utils/Item";
import { DataTable, itemColumns } from "../components/table/Table";
import Form from "../components/CRUD/Form";
import { viewSupplier } from "../utils/supplierUtils";
import { resetState } from "../utils/commonUtils";
import { viewCategories } from "../utils/categoryUtils";

function ItemDashboard() {
  const [items, setItems] = useState<AllItems[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [makeItem, setMakeItem] = useState<CreateItemPayload>({
    nama: "",
    qrcode: "",
    price: 0,
    supplier_id: "",
    description: "",
    discount: 0,
    image: null,
    category_id: 0,
  });
  const [editItem, setEditItem] = useState<UpdateItemPayload>({
    id: "",
    nama: "",
    qrcode: "",
    price: 0,
    supplier_id: "",
    description: "",
    discount: 0,
    image: null,
    category_id: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<{ id: string; show: boolean }>({
    id: "",
    show: false,
  });

  // handlers
  const handleSelectSupplier = (id: string) => {
    setMakeItem((prev) => ({
      ...prev,
      supplier_id: id,
    }));
  };

  const toggleEditModal = async (id: string) => {
    setShowEditModal({
      id: id,
      show: true,
    });

    const filteredItem = items.filter((item) => item.id === id);

    if (items.length > 0) {
      setEditItem({
        id: id,
        nama: filteredItem[0].nama,
        qrcode: filteredItem[0].qrcode,
        price: filteredItem[0].price,
        supplier_id: filteredItem[0].supplier_id,
        description: filteredItem[0].description,
        discount: filteredItem[0].discount,
        image: null,
        category_id: filteredItem[0].category_id,
      });
    }

    console.log("Im here");
  };

  useEffect(() => {
    fetchItems(setItems);
    viewSupplier(setSuppliers);
    viewCategories(setCategories);
  }, []);

  useEffect(() => {
    console.log(items);
    console.log(suppliers);
    console.log(categories);
  }, [items, suppliers, categories]);

  return (
    <div className="mih-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Items</h1>
        <p className="text-sm text-gray-500 mb-4">Items Dashboard</p>

        {/* Buttons */}
        <div className="mb-4 flex gap-4">
          <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            + Add Item
          </button>
          {/* <button onClick={() => setShowDeleteModal(true)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete Supplier
        </button> */}
        </div>

        {/* Add Form */}
        {showAddForm && (
          <Form<CreateItemPayload, Items[], Supplier, Category>
            datas3={categories}
            datas2={suppliers}
            datas={items}
            task="add"
            page="item"
            item={"Item"}
            data={makeItem}
            setData={setMakeItem}
            onSubmit={createItem}
            onCancel={() => {
              setShowAddForm(false);
              resetState(setMakeItem, makeItem);
            }}
            callback={handleSelectSupplier}
          />
        )}

        {/* Edit Form */}
        {showEditModal.show && (
          <Form<UpdateItemPayload, Items[], Supplier, Category>
            datas3={categories}
            datas2={suppliers}
            datas={items}
            task="update"
            page="item"
            item={"Item"}
            data={editItem}
            setData={setEditItem}
            onSubmit={updateItem}
            onCancel={() => {
              setShowEditModal({
                id: "",
                show: false,
              });
              resetState(setMakeItem, makeItem);
            }}
            callback={handleSelectSupplier}
          />
        )}

        <DataTable columns={itemColumns(toggleEditModal)} data={items} filter="category_name" placeholder="Search by category"></DataTable>
      </div>
    </div>
  );
}

export default ItemDashboard;
