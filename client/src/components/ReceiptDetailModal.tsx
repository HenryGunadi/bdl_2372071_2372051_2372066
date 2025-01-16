import { useEffect } from "react";
import { Receipt, ReceiptDetail, Tax } from "../types/types";

interface ReceiptDetailProps {
  receipt: Receipt;
  taxes: Tax[]
  receiptDetail: ReceiptDetail[]; // Accepting receiptDetail as an array
  onClose: () => void;
}

export default function ReceiptDetailModal({ taxes, receipt, receiptDetail, onClose }: ReceiptDetailProps) {
  useEffect(() => {
    console.log("HELOOOOO : ", receiptDetail);
  }, [receiptDetail]);

  const tax = taxes.filter((value, key) => value.id === receipt.tax_id)[0].tax_rate
  const total_tax = tax * (receipt.total_subtotal - receipt.total_discount)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-4xl sm:w-full h-auto sm:h-auto overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Receipt Detail - {receipt.receipt_id}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>

        {/* Receipt Summary Information */}
        <div className="mb-6 border-b pb-4">
          <h3 className="font-semibold text-lg text-gray-700">Receipt Summary</h3>
          <div className="space-y-2 mt-2">
            <p className="font-medium">
              Payment Method: <span className="font-normal">{receipt.payment_method}</span>
            </p>
            <p className="font-medium">
              Subtotal: <span className="font-normal">${receipt.total_subtotal.toFixed(2)}</span>
            </p>
            <p className="font-medium">
              Discount: <span className="font-normal">-${receipt.total_discount.toFixed(2)}</span>
            </p>
            <p className="font-medium">
              Total Tax: <span className="font-normal">${total_tax}</span>
            </p>
            <p className="font-medium">
              Total Amount: <span className="font-normal">${receipt.total_amount.toFixed(2)}</span>
            </p>
            <p className="font-medium">
              Tax ID: <span className="font-normal">{receipt.tax_id}</span>
            </p>
            <p className="font-medium">
              Created At: <span className="font-normal">{new Date(receipt.created_at).toLocaleDateString()}</span>
            </p>
          </div>
        </div>

        {/* Iterate over each receiptDetail item */}
        <div className="max-h-96 overflow-y-auto">
          {receiptDetail.length > 0 ? (
            receiptDetail.map((detail, index) => {
              return (
                <div key={index} className="mb-6 border-b pb-4">
                  <div className="space-y-2">
                    <p className="font-medium">
                      Item ID: <span className="font-normal">{detail.items_id}</span>
                    </p>
                    <p className="font-medium">
                      Quantity: <span className="font-normal">{detail.quantity}</span>
                    </p>
                    <p className="font-medium">
                      Unit Price: <span className="font-normal">${detail.unit_price.toFixed(2)}</span>
                    </p>
                    <p className="font-medium">
                      Unit Discount: <span className="font-normal">{detail.unit_discount}%</span>
                    </p>
                    <p className="font-medium">
                      Total: <span className="font-normal">${detail.total && !isNaN(detail.total) ? detail.total.toFixed(2) : "0.00"}</span>
                    </p>
                    <p className="font-medium">
                      Created At: <span className="font-normal">{detail.created_at ? new Date(detail.created_at).toLocaleDateString() : "No date"}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-700">No receipt details available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
