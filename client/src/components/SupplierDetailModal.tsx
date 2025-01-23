import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Supplier } from "../types/types";

interface SupplierDetailModalProps {
  supplier: Supplier | null;
  isOpen: boolean;
  onClose: () => void;
}

const SupplierDetailModal: React.FC<SupplierDetailModalProps> = ({ supplier, isOpen, onClose }) => {
  if (!supplier) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supplier Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="space-y-2 text-sm break-words">
            <p>
              <strong>Name:</strong> {supplier.name}
            </p>
            <p>
              <strong>Phone:</strong> {supplier.phone_number}
            </p>
            <p>
              <strong>Email:</strong> {supplier.email}
            </p>
            <p>
              <strong>Address:</strong> {supplier.address}
            </p>
            <p>
              <strong>City:</strong> {supplier.city}
            </p>
            <p>
              <strong>Country:</strong> {supplier.country}
            </p>
            <p>
              <strong>Postal Code:</strong> {supplier.postal_code}
            </p>
            <p>
              <strong>Created At:</strong> {new Date(supplier.created_at).toLocaleDateString()}
            </p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierDetailModal;
