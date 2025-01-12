import { useEffect, useState } from "react";
import { Tax, TaxPayload } from "../types/types";
import Form from "../components/CRUD/Form";
import { createTax, deleteTax, updateTax, viewTax } from "../utils/TaxUtils";
import DeleteModal from "../components/CRUD/DeleteModal";
import { resetState } from "../utils/commonUtils";

export default function TaxPage() {
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [makeTax, setMakeTax] = useState<TaxPayload>({
    id: "",
    tax_rate: 0,
    start_date: null,
    end_date: null,
  });

  const [toggleCreateForm, setToggleCreateForm] = useState<boolean>(false);

  const [toggleDelete, setToggleDelete] = useState<{ valueId: string; show: boolean }>({
    valueId: "",
    show: false,
  });
  const [toggleEdit, setToggleEdit] = useState<{ valueId: string; show: boolean }>({
    valueId: "",
    show: false,
  });

  // Function to check if today's date is within the start and end date range
  const isTaxActive = (startDate: Date, endDate: Date): boolean => {
    const today = new Date();
    return today >= new Date(startDate) && today <= new Date(endDate);
  };

  async function handleDelete() {
    try {
      await deleteTax(toggleDelete.valueId);
      setToggleDelete({
        valueId: "",
        show: false,
      });
    } catch (err) {
      console.error(err);
    }
  }

  function handleEditModal(id: string) {
    setMakeTax((prev) => ({
      ...prev,
      id: id,
    }));
    setToggleEdit({
      valueId: id,
      show: true,
    });

    const filterTax = taxes.filter((value, key) => value.id === id);

    setMakeTax({
      id: filterTax[0].id,
      tax_rate: filterTax[0].tax_rate,
      start_date: filterTax[0].start_date,
      end_date: filterTax[0].end_date,
    });
  }

  useEffect(() => {
    viewTax(setTaxes);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Tax Information</h1>
        <p className="text-sm text-gray-500 mb-4">Manage current tax rates and information</p>

        {/* Add Tax Button and Search */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            onClick={() => {
              setToggleCreateForm(true);
            }}
          >
            + Add Tax
          </button>
          <input type="text" placeholder="Search Tax" className="border border-gray-300 rounded-lg px-4 py-2 w-64" />
        </div>

        {toggleCreateForm && (
          <Form
            data={makeTax}
            setData={setMakeTax}
            task="add"
            page="tax"
            item="Tax"
            onSubmit={createTax}
            onCancel={() => {
              setToggleCreateForm(false);
              resetState(setMakeTax, makeTax);
            }}
          ></Form>
        )}

        {toggleEdit.show && toggleEdit.valueId && (
          <Form
            datas={taxes}
            data={makeTax}
            setData={setMakeTax}
            task="update"
            page="tax"
            item="Tax"
            onSubmit={() => {
              updateTax(makeTax);
            }}
            onCancel={() => {
              setToggleEdit({
                valueId: "",
                show: false,
              });
              resetState(setMakeTax, makeTax);
            }}
          ></Form>
        )}

        {toggleDelete.show && toggleDelete.valueId && (
          <DeleteModal
            valueId={toggleDelete.valueId}
            onDelete={() => {
              handleDelete();
            }}
            onCancel={() => {
              setToggleDelete({
                valueId: "",
                show: false,
              });
            }}
          ></DeleteModal>
        )}

        {/* Tax List Section */}
        <div className="space-y-4">
          {taxes.map((tax) => {
            const isActive = isTaxActive(tax.start_date, tax.end_date); // Check if tax is active

            return (
              <div key={tax.id} className={`bg-white rounded-lg shadow-md p-4 flex justify-between items-center ${!isActive ? "bg-zinc-200" : "bg-white"}`}>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Tax Rate: {tax.tax_rate}%</h3>
                  <p className="text-sm text-gray-500">Active: {isActive ? "Yes" : "No"}</p>
                  <p className="text-sm text-gray-500">Start Date: {new Date(tax.start_date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">End Date: {new Date(tax.end_date).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="text-zinc-500 hover:text-yellow-700 font-semibold text-md"
                    onClick={() => {
                      handleEditModal(tax.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold text-md"
                    onClick={() => {
                      console.log("TAX ID : ", tax.id);
                      setToggleDelete({
                        valueId: tax.id,
                        show: true,
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
