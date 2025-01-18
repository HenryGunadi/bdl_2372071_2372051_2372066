import { useEffect, useState } from "react";
import { AllItems, Category, CreateItemPayload, Items, Supplier, UpdateItemPayload } from "../types/types";
import { createItem, deleteItem, fetchItems, updateItem } from "../utils/Item";
import { DataTable, itemColumns } from "../components/table/Table";
import Form from "../components/CRUD/Form";
import { viewSupplier } from "../utils/supplierUtils";
import { resetState } from "../utils/commonUtils";
import { viewCategories } from "../utils/categoryUtils";
import ItemDetailModal from "../components/ItemDetailModal";
import DeleteModal from "../components/CRUD/DeleteModal";

function ItemDashboard() {
  const [items, setItems] = useState<AllItems[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [makeItem, setMakeItem] = useState<CreateItemPayload>({
    nama: "",
    price: 0,
    supplier_id: "",
    description: "",
    discount: 0,
    image: null,
    category_id: 0,
    buy_price: 0,
  });
  const [editItem, setEditItem] = useState<UpdateItemPayload>({
    id: "",
    nama: "",
    price: 0,
    supplier_id: "",
    description: "",
    discount: 0,
    image: null,
    category_id: 0,
    buy_price: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<{ id: string; show: boolean }>({
    id: "",
    show: false,
  });
  const [showItemDetailModal, setShowItemDetailModal] = useState<{ valueId: string; show: boolean }>({
    valueId: "",
    show: false,
  });
  const [deleteItemAlert, setDeleteItemAlert] = useState<{ id: string; show: boolean }>({
    id: "",
    show: false,
  });

  // handlers
  const handleSelectSupplier = (id: string) => {
    setEditItem((prev) => ({
      ...prev,
      supplier_id: id,
    }));
  };

  const handleSelectMakeSupplier = (id: string) => {
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
    console.log("FILTERED ITEM UPDATE : ", filteredItem);

    if (items.length > 0) {
      setEditItem({
        id: id,
        nama: filteredItem[0].nama,
        price: filteredItem[0].price,
        supplier_id: filteredItem[0].supplier_id,
        description: filteredItem[0].description,
        discount: filteredItem[0].discount,
        image: null,
        category_id: filteredItem[0].category_id,
        buy_price: filteredItem[0].buy_price,
      });
    }

    console.log("Im here");
  };

  function toggleItemDetailModal(id: string) {
    setShowItemDetailModal({
      valueId: id,
      show: true,
    });
  }

  function toggleDeleteItem(id: string) {
    setDeleteItemAlert({
      id: id,
      show: true,
    });
  }

  useEffect(() => {
    fetchItems(setItems);
    viewSupplier(setSuppliers);
    viewCategories(setCategories);
  }, []);

  useEffect(() => {
    console.log("Edit Item : ", editItem);
  }, [editItem]);

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
            callback={handleSelectMakeSupplier}
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

        {/* show item detail */}
        {showItemDetailModal.show && showItemDetailModal.valueId && (
          <ItemDetailModal
            item={items.filter((value, key) => value.id === showItemDetailModal.valueId)[0]}
            onClose={() => {
              setShowItemDetailModal({
                valueId: "",
                show: false,
              });
            }}
          ></ItemDetailModal>
        )}

        {/* delete item alert */}
        {deleteItemAlert.show && deleteItemAlert.id && (
          <DeleteModal
            onDelete={() => {
              deleteItem(deleteItemAlert.id);
            }}
            onCancel={() => {
              setDeleteItemAlert({
                id: "",
                show: false,
              });
            }}
            valueId={deleteItemAlert.id}
          ></DeleteModal>
        )}

        <DataTable columns={itemColumns(toggleEditModal, toggleItemDetailModal, toggleDeleteItem)} data={items} filter="category_name" placeholder="Search by category"></DataTable>
      </div>
    </div>
  );
}

export default ItemDashboard;
