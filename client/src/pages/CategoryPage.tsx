import { useEffect, useState } from "react";
import { Category, CategoryPayload, UpdateCategory } from "../types/types";
import Form from "../components/CRUD/Form";
import DeleteModal from "../components/CRUD/DeleteModal";
import { resetState } from "../utils/commonUtils";
import { createCategory, deleteCategory, updateCategories, viewCategories } from "../utils/categoryUtils";
import { categoryColumn, DataTable } from "../components/table/Table";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [makeCategory, setMakeCategory] = useState<CategoryPayload>({
    category_name: "",
  });
  const [updateCategory, setUpdateCategory] = useState<UpdateCategory>({
    id: 0,
    category_name: "",
  });

  const [toggleCreateCategory, setToggleCreateCategory] = useState<boolean>(false);

  const [toggleDelete, setToggleDelete] = useState<{ valueId: number; show: boolean }>({
    valueId: 0,
    show: false,
  });
  const [toggleEdit, setToggleEdit] = useState<{ valueId: number; show: boolean }>({
    valueId: 0,
    show: false,
  });

  async function handleDelete() {
    try {
      await deleteCategory(toggleDelete.valueId);
      setToggleDelete({
        valueId: 0,
        show: false,
      });
    } catch (err) {
      console.error(err);
    }
  }

  function handleEditModal(id: number) {
    setToggleEdit({
      valueId: id,
      show: true,
    });
    setUpdateCategory((prev) => ({
      ...prev,
      id: id,
    }));
  }

  function handleDeleteModal(id: number) {
    setToggleDelete({
      valueId: id,
      show: true,
    });
  }

  useEffect(() => {
    viewCategories(setCategories);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <p className="text-sm text-gray-500 mb-4">Categories information</p>

        {/* Add Tax Button and Search */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            onClick={() => {
              setToggleCreateCategory(true);
            }}
          >
            + Add Category
          </button>
        </div>

        {toggleCreateCategory && (
          <Form
            data={makeCategory}
            setData={setMakeCategory}
            task="add"
            page="categories"
            item="Category"
            onSubmit={createCategory}
            onCancel={() => {
              setToggleCreateCategory(false);
              resetState(setMakeCategory, makeCategory);
            }}
          ></Form>
        )}

        {toggleEdit.show && toggleEdit.valueId && (
          <Form
            data={updateCategory}
            setData={setUpdateCategory}
            task="update"
            page="categories"
            item="Category"
            onSubmit={() => {
              updateCategories(updateCategory);
            }}
            onCancel={() => {
              setToggleEdit({
                valueId: 0,
                show: false,
              });
              resetState(setUpdateCategory, updateCategory);
            }}
          ></Form>
        )}

        {toggleDelete.show && toggleDelete.valueId && (
          <DeleteModal
            valueId=""
            onDelete={() => {
              handleDelete();
            }}
            onCancel={() => {
              setToggleDelete({
                valueId: 0,
                show: false,
              });
            }}
          ></DeleteModal>
        )}

        <DataTable columns={categoryColumn(handleEditModal, handleDeleteModal)} data={categories} filter="category_name" placeholder="Search by name"></DataTable>
      </div>
    </div>
  );
}
