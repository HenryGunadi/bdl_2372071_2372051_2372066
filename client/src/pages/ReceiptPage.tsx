import { useEffect, useState } from "react";
import { ModalType, AllItems, Receipt, CreateReceiptPayload, ReceiptDetail, ReceiptDetailPayload, DeleteReceiptPayload, Tax, Inventory } from "../types/types";
import Form from "../components/CRUD/Form";
import { DataTable, receiptColumns } from "../components/table/Table";
import { fetchItems } from "../utils/Item";
import DeleteModal from "../components/CRUD/DeleteModal";
import { resetState } from "../utils/commonUtils";
import ReceiptDetailModal from "../components/ReceiptDetailModal";
import { createReceipt, deleteReceipt, viewReceipt, viewReceiptDetails } from "../utils/receiptUtils";
import ReceiptModal from "../components/CRUD/ReceiptModal";
import { viewTax } from "../utils/TaxUtils";
import UpdateReceiptItemModal from "../components/CRUD/UpdateReceiptItemModal";
import { viewInventories } from "../utils/inventoryUtils";

const ReceiptPage = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [makeReceipt, setMakeReceipt] = useState<CreateReceiptPayload>({
    payment_method: "",
    total_subtotal: 0,
    total_discount: 0,
    total_amount: 0,
    tax_id: "",
    items: [],
  });
  const [receiptDetails, setReceiptDetails] = useState<ReceiptDetail[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<ModalType>({
    valueId: "",
    show: false,
  });
  const [items, setItems] = useState<AllItems[]>([]);
  const [openReceiptItemModal, setReceiptItemModal] = useState<boolean>(false);
  // const [poDetails, setPODetails] = useState<PODetails[]>([]);
  const [showReceiptDetail, setShowReceiptDetail] = useState<{ valueId: string; show: boolean }>({
    valueId: "",
    show: true,
  });
  const [openUpdateReceiptItem, setOpenUpdateReceiptItem] = useState<{
    index: number;
    open: boolean;
  }>({
    index: -1,
    open: false,
  });
  const [updatedItem, setUpdatedItem] = useState<ReceiptDetailPayload>({
    items_id: "",
    quantity: 0,
    unit_price: 0,
    unit_discount: 0,
  });
  const [inventories, setInventories] = useState<Inventory[]>([]);

  function handleToggleDetail(id: string) {
    setShowReceiptDetail({
      valueId: id,
      show: true,
    });
    viewReceiptDetails(setReceiptDetails, id);
  }

  function handleToggleDelete(id: string) {
    setShowDeleteModal({
      valueId: id,
      show: true,
    });
  }

  const getActiveTaxId = (taxes: Tax[] | null): string => {
    const today = new Date();

    if (taxes) {
      for (const tax of taxes) {
        const startDate = new Date(tax.start_date);
        const endDate = new Date(tax.end_date);

        if (today >= startDate && today <= endDate) {
          return tax.id;
        }
      }
    }

    return "";
  };

  const handelAddReceiptItem = (ReceiptDetail: ReceiptDetailPayload) => {
    console.log("RECEIPT DETAIL : ", ReceiptDetail);

    setMakeReceipt((prev) => ({
      ...prev,
      items: [...prev.items, ReceiptDetail],
    }));
  };

  useEffect(() => {
    viewReceipt(setReceipts);
    fetchItems(setItems);
    viewTax(setTaxes);
    viewInventories(setInventories);
  }, []);

  useEffect(() => {
    const taxID = getActiveTaxId(taxes);
    setMakeReceipt((prev) => ({
      ...prev,
      tax_id: taxID,
    }));
  }, [taxes]);

  useEffect(() => {
    console.log("RECEIPT UPDATED : ", makeReceipt);
  }, [makeReceipt]);

  function handleShowModal() {
    setReceiptItemModal(true);
  }

  async function handleAdd() {
    try {
      console.log("RECEIPT FINAL : ", makeReceipt);
      await createReceipt(makeReceipt, setMakeReceipt);
      await viewReceipt(setReceipts);
      setReceiptItemModal(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete() {
    try {
      const payload: DeleteReceiptPayload = {
        id: showDeleteModal.valueId,
        undo: 0,
      };

      await deleteReceipt(payload);
      resetState(setShowDeleteModal, showDeleteModal);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (makeReceipt.items.length > 0) {
      let subtotal = 0;
      let discount = 0;

      // Calculate subtotal and discount based on items
      makeReceipt.items.forEach((item) => {
        subtotal += item.quantity * item.unit_price;
        discount += item.unit_price * item.quantity * item.unit_discount;
      });

      // Get the tax rate for the selected tax ID
      const taxRate = taxes.find((value) => value.id === makeReceipt.tax_id)?.tax_rate || 0;
      console.log("Tax rate : ", taxRate);

      // Calculate tax based on the total subtotal after discount
      const tax = (subtotal - discount) * taxRate;
      console.log("TAX subtotal : ", (subtotal - discount) * taxRate);

      // Calculate the total amount
      const amount = subtotal - discount + tax;

      // Update the state with the recalculated totals
      setMakeReceipt((prev) => ({
        ...prev,
        total_subtotal: subtotal,
        total_discount: discount,
        total_tax: tax,
        total_amount: amount,
      }));

      console.log("Receipt Items UPDATED: ", makeReceipt);
    }
  }, [makeReceipt.items, makeReceipt.tax_id, taxes]);

  const handleSubmitUpdateCart = (updatedItem: ReceiptDetailPayload) => {
    setMakeReceipt((prev) => {
      if (!prev.items || openUpdateReceiptItem.index < 0 || openUpdateReceiptItem.index >= prev.items.length) {
        console.error("Invalid index or items array is missing in state");
        return prev; // Do nothing if items are missing or index is out of bounds
      }

      const updatedItems = [...prev.items]; // Copy the items array to avoid mutation
      updatedItems[openUpdateReceiptItem.index] = updatedItem; // Update the item at the specified index

      console.log("Updated Items Array:", updatedItems);

      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const handleUpdateCart = (index: number) => {
    setOpenUpdateReceiptItem({
      index: index,
      open: true,
    });

    const selectedItem: ReceiptDetailPayload = makeReceipt.items[index];
    setUpdatedItem(selectedItem);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Receipt Purchases</h1>
        <p className="text-sm text-gray-500 mb-4">Manage and track your receipt purchases here.</p>

        {/* Buttons */}
        <div className="mb-4 flex gap-4">
          <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            + Add Receipt Purchase
          </button>
        </div>

        <ReceiptModal open={openReceiptItemModal} setOpen={setReceiptItemModal} data={inventories} onSubmit={handelAddReceiptItem}></ReceiptModal>

        {/* Add Form */}
        {showAddForm && (
          <Form<CreateReceiptPayload, Receipt[], {}, {}>
            modal={handleShowModal}
            data4={items}
            datas3={makeReceipt.items}
            datas2={taxes}
            datas={receipts}
            page="receipt"
            task="add"
            item={"Receipt Purchase"}
            data={makeReceipt}
            setData={setMakeReceipt}
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
            handleUpdateCart={handleUpdateCart}
          />
        )}

        {showDeleteModal.show && (
          <DeleteModal
            valueId={showDeleteModal.valueId}
            onDelete={handleDelete}
            onCancel={() => {
              resetState(setShowDeleteModal, showDeleteModal);
            }}
          ></DeleteModal>
        )}

        {openUpdateReceiptItem.open && <UpdateReceiptItemModal data={inventories} setOpen={setOpenUpdateReceiptItem} setUpdateItem={setUpdatedItem} updatedItem={updatedItem} onSubmit={handleSubmitUpdateCart} />}

        {showReceiptDetail.show && showReceiptDetail.valueId && (
          <ReceiptDetailModal
            taxes={taxes}
            receipt={receipts.filter((value) => value.receipt_id === showReceiptDetail.valueId)[0]}
            receiptDetail={receiptDetails}
            onClose={() => {
              setShowReceiptDetail({
                valueId: "",
                show: false,
              });
            }}
          ></ReceiptDetailModal>
        )}

        <DataTable columns={receiptColumns(handleToggleDetail, handleToggleDelete)} data={receipts} filter="receipt_id" placeholder="Filter by ID"></DataTable>
      </div>
    </div>
  );
};

export default ReceiptPage;
