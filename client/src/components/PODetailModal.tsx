import { PO, PODetails } from "../types/types";

interface PODetailModalProps {
  po: PO;
  poDetail: PODetails[]; // Accepting poDetail as an array
  onClose: () => void;
}

export default function PODetailModal({ po, poDetail, onClose }: PODetailModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-4xl sm:w-full h-auto sm:h-auto overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">PO Detail - {po.id}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>

        {/* PO Summary Information */}
        <div className="mb-6 border-b pb-4">
          <h3 className="font-semibold text-lg text-gray-700">Purchase Order Summary</h3>
          <div className="space-y-2 mt-2">
            <p className="font-medium">
              Payment Method: <span className="font-normal">{po.payment_method}</span>
            </p>
            <p className="font-medium">
              Currency: <span className="font-normal">{po.currency}</span>
            </p>
            <p className="font-medium">
              Subtotal: <span className="font-normal">${po.total_subtotal.toFixed(2)}</span>
            </p>
            <p className="font-medium">
              Discount: <span className="font-normal">-${po.total_discount.toFixed(2)}</span>
            </p>
            <p className="font-medium">
              Tax: <span className="font-normal">${po.total_tax.toFixed(2)}</span>
            </p>
            <p className="font-medium">
              Total Amount Due: <span className="font-normal">${po.total_amount_due.toFixed(2)}</span>
            </p>
            <p className="font-medium">
              Status: <span className="font-normal">{po.status}</span>
            </p>
          </div>
        </div>

        {/* Iterate over each poDetail item */}
        <div className="max-h-96 overflow-y-auto">
          {poDetail.length > 0 ? (
            poDetail.map((detail, index) => {
              // Format expiration date for each item
              const expDateFormatted = detail.exp_date ? new Date(detail.exp_date).toLocaleDateString() : "No expiration date";

              return (
                <div key={index} className="mb-6 border-b pb-4">
                  <div className="space-y-2">
                    <p className="font-medium">
                      Item ID: <span className="font-normal">{detail.item_id}</span>
                    </p>
                    <p className="font-medium">
                      Quantity: <span className="font-normal">{detail.quantity}</span>
                    </p>
                    <p className="font-medium">
                      Unit Price: <span className="font-normal">${detail.unit_price.toFixed(2)}</span>
                    </p>
                    <p className="font-medium">
                      Discount: <span className="font-normal">{detail.discount}%</span>
                    </p>
                    <p className="font-medium">
                      Total: <span className="font-normal">${detail.total.toFixed(2)}</span>
                    </p>
                    <p className="font-medium">
                      Expiration Date: <span className="font-normal">{expDateFormatted}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-700">No purchase order details available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
