export type CreateItemPayload = {
  nama: string;
  price: number;
  supplier_id: string;
  description: string;
  discount: number;
  image: File | null;
  category_id: number;
  buy_price: number;
};

export type UpdateItemPayload = {
  id: string;
  nama: string;
  price: number;
  supplier_id: string;
  description: string;
  discount: number;
  image: File | null | string;
  category_id: number;
  buy_price: number;
};

export type Category = {
  id: number;
  category_name: string;
  created_at: Date;
};

export type Items = {
  id: string;
  nama: string;
  description: string;
  created_at: string;
  image_url: string;
  discount: number;
  price: number;
  category_id: number;
  supplier_id: string;
  buy_price: number;
};

export type AllItems = {
  id: string;
  nama: string;
  description: string;
  created_at: string;
  image_url: string;
  discount: number;
  price: number;
  category_id: number;
  supplier_id: string;
  supplier_name: string;
  category_name: string;
  buy_price: number;
};

export type Supplier = {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  address: string;
  country: string;
  city: string;
  postal_code: string | null;
  created_at: Date;
};

export type UpdateSupplierPayload = {
  id: string;
  name: string | null;
  phone_number: string | null;
  email: string | null;
  address: string | null;
  country: string | null;
  city: string | null;
  postal_code: string | null;
  created_at?: Date;
};

export type SupplierPayload = {
  name: string;
  phone_number: string;
  email: string;
  address: string;
  country: string;
  city: string;
  postal_code: string | null;
};

export type ModalType = {
  valueId: string;
  show: boolean;
};

export type Admin = {
  id: string;
  name: string;
  password: string;
  email: string;
  phone_number: string;
  created_at: Date | undefined;
  role: string;
};

export type CreateAdmin = {
  name: string;
  password: string;
  email: string;
  phone_number: string;
  role: string;
};

export type AdminPayload = {
  id: string;
  name: string | null;
  password: string | null;
  email: string | null;
  phone_number: string | null;
  role: string | null;
};

export type CreatePO = {
  payment_method: string;
  currency: string;
  total_subtotal: number;
  total_amount_due: number;
  items:
    | Array<{
        item_id: string;
        quantity: number;
        unit_price: number;
      }>
    | []; // Allow items to be either an array of objects or an empty array
  supplier_id: string;
  status: string;
};

export type PO = {
  id: string;
  payment_method: string;
  currency: string;
  total_subtotal: number;
  total_amount_due: number;
  supplier_id: string;
  status: "ongoing" | "accepted";
  name: string;
};

export type UpdatePO = {
  id: string;
  payment_method: string | null;
  currency: string | null;
  total_subtotal: number | null;
  total_amount_due: number | null;
  supplier_id: string | null;
  status: string | null;
};

export type PODetailPayload = {
  item_id: string;
  quantity: number;
  unit_price: number;
};

export type PODetails = {
  id: string;
  purchase_order_id: string;
  item_id: string;
  quantity: number;
  unit_price: number;
  total: number;
  created_at: Date;
  nama: string;
};

export type UpdatePODetails = {
  id: string;
  purchase_order_id: string;
  item_id: string | null;
  quantity: number | null;
  unit_price: number | null;
  total: number | null;
};

export type Inventory = {
  id: number;
  item_id: string;
  quantity: number;
  last_updated: Date;
  nama: string;
  image_urlL: string;
  category_id: number;
  category_name: string;
  price: number;
  discount: number;
};

export type InventoryPayload = {
  item_id: string;
  quantity: number;
};

export type Tax = {
  id: string;
  tax_rate: number;
  start_date: Date;
  end_date: Date;
  created_at: Date;
};

export type TaxPayload = {
  id: string;
  tax_rate: number;
  start_date: Date | null;
  end_date: Date | null;
};

export type CreateReceiptPayload = {
  payment_method: string;
  total_subtotal: number;
  total_discount: number;
  total_amount: number;
  tax_id: string;
  items:
    | Array<{
        items_id: string;
        quantity: number;
        unit_price: number;
        unit_discount: number;
      }>
    | []; // Allow items to be either an array of objects or an empty array
};

export type ReceiptDetailPayload = {
  items_id: string;
  quantity: number;
  unit_price: number;
  unit_discount: number;
};

export type Receipt = {
  receipt_id: string;
  payment_method: string;
  total_subtotal: number;
  total_discount: number;
  total_amount: number;
  tax_id: string;
  tax_rate: number;
  created_at: Date;
};

export type ReceiptDetail = {
  id: string;
  items_id: string;
  receipt_id: string;
  unit_price: number;
  quantity: number;
  unit_discount: number;
  total: number;
  created_at?: Date;
  nama: string;
};

export type DeleteReceiptPayload = {
  id: string;
  undo: 1 | 0;
};

export type CategoryPayload = {
  category_name: string;
};

export type UpdateCategory = {
  id: number;
  category_name: string;
};
