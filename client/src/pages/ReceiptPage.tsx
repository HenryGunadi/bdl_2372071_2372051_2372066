import { useEffect, useState } from "react";
import { ModalType, PO, CreatePO, UpdatePO, Supplier, AllItems, PODetailPayload, PODetails, Receipt, CreateReceiptPayload, ReceiptDetail, ReceiptDetailPayload, DeleteReceiptPayload, Tax } from "../types/types";
import Form from "../components/CRUD/Form";
import { createPO, deletePO, updatePO, viewPO, viewPODetails } from "../utils/poUtils";
import { columns, DataTable, receiptColumns } from "../components/table/Table";
import { viewSupplier } from "../utils/supplierUtils";
import POModal from "../components/CRUD/POModal";
import { fetchItems } from "../utils/Item";
import DeleteModal from "../components/CRUD/DeleteModal";
import { resetState } from "../utils/commonUtils";
import UpdatePOModal from "../components/CRUD/UpdatePOModal";
import PODetailModal from "../components/PODetailModal";
import ReceiptDetailModal from "../components/ReceiptDetailModal";
import { createReceipt, deleteReceipt, viewReceipt, viewReceiptDetails } from "../utils/receiptUtils";
import ReceiptModal from "../components/CRUD/ReceiptModal";
import { viewTax } from "../utils/TaxUtils";

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

  function handleToggleDetail(id: string) {
    setShowReceiptDetail({
      valueId: id,
      show: true,
    });
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

  async function handleCreateReceipt() {
    try {
      await createReceipt(makeReceipt);
      await viewReceipt(setReceipts);
      await viewReceiptDetails(setReceiptDetails);
    } catch (err) {
      console.error(err);
    }
  }

  const handelAddReceiptItem = (ReceiptDetail: ReceiptDetailPayload) => {
    console.log("RECEIPT DETAIL : ", ReceiptDetail);

    setMakeReceipt((prev) => ({
      ...prev,
      items: [...prev.items, ReceiptDetail],
    }));
  };

  useEffect(() => {
    viewReceipt(setReceipts);
    viewReceiptDetails(setReceiptDetails);
    fetchItems(setItems);
    viewTax(setTaxes);
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
      await createReceipt(makeReceipt);
      await viewReceipt(setReceipts);
      setReceiptItemModal(false);
      resetState(setMakeReceipt, makeReceipt);
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
      let tax = 0;

      makeReceipt.items.forEach((item) => {
        subtotal += item.quantity * item.unit_price;

        discount += item.unit_price * item.quantity * item.unit_discount;

        tax += (item.quantity * item.unit_price - item.unit_discount) * taxes.filter((value, key) => value.id === makeReceipt.tax_id)[0].tax_rate || 0;
      });

      const amount = subtotal - discount + tax;

      setMakeReceipt((prev) => ({
        ...prev,
        total_subtotal: subtotal,
        total_discount: discount,
        total_tax: tax,
        total_amount: amount,
      }));

      console.log("Receipt Items UPDATED: ", makeReceipt);
    }
  }, [makeReceipt.items]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* <Combobox data={} onSelect={}></Combobox> */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">Receipt Purchases</h1>
        <p className="text-sm text-gray-500 mb-4">Manage and track your receipt purchases here.</p>

        {/* Buttons */}
        <div className="mb-4 flex gap-4">
          <button onClick={() => setShowAddForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            + Add Receipt Purchase
          </button>
          {/* <button onClick={() => setShowDeleteModal(true)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete Supplier
        </button> */}
        </div>

        <ReceiptModal open={openReceiptItemModal} setOpen={setReceiptItemModal} data={items} onSubmit={handelAddReceiptItem}></ReceiptModal>

        {/* Add Form */}
        {showAddForm && (
          <Form<CreateReceiptPayload, Receipt[], {}, {}>
            modal={handleShowModal}
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

        {showReceiptDetail.show && showReceiptDetail.valueId && (
          <ReceiptDetailModal
            receipt={receipts.filter((value, key) => value.receipt_id === showReceiptDetail.valueId)[0]}
            receiptDetail={receiptDetails.filter((value, key) => value.receipt_id === showReceiptDetail.valueId)}
            onClose={() => {
              setShowReceiptDetail({
                valueId: "",
                show: false,
              });
            }}
          ></ReceiptDetailModal>
        )}

        <DataTable columns={receiptColumns(handleToggleDetail, handleToggleDelete)} data={receipts} filter="receipt_id" placeholder="Filter by status"></DataTable>
      </div>
    </div>
  );
};

export default ReceiptPage;
