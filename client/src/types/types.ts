export type CreateItemPayload = {
  nama: string;
  qrcode: string;
  price: number;
  supplier_id: string;
  description: string;
  discount: number;
  image: File | null;
  category_id: number;
};

export type UpdateItemPayload = {
  id: string;
  nama: string;
  qrcode: string;
  price: number;
  supplier_id: string;
  description: string;
  discount: number;
  image: File | null;
  category_id: number;
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
  qrcode: string;
  supplier_id: string;
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
  qrcode: string;
  supplier_id: string;
  category_name: string;
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
  total_discount: number;
  total_tax: number;
  total_amount_due: number;
  items:
    | Array<{
        item_id: string;
        quantity: number;
        unit_price: number;
        discount: number;
        exp_date: Date | null;
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
  total_discount: number;
  total_tax: number;
  total_amount_due: number;
  supplier_id: string;
  status: "Ongoing" | "Accepted" | "Terminated";
};

export type UpdatePO = {
  id: string;
  payment_method: string | null;
  currency: string | null;
  total_subtotal: number | null;
  total_discount: number | null;
  total_tax: number | null;
  total_amount_due: number | null;
  supplier_id: string | null;
  status: string | null;
};

export type PODetailPayload = {
  item_id: string;
  quantity: number;
  unit_price: number;
  discount: number;
  exp_date: Date | null;
};

export type PODetails = {
  id: string;
  purchase_order_id: string;
  item_id: string;
  quantity: number;
  unit_price: number;
  discount: number;
  total: number;
  exp_date: Date;
};

export type UpdatePODetails = {
  id: string;
  purchase_order_id: string;
  item_id: string | null;
  quantity: number | null;
  unit_price: number | null;
  discount: number | null;
  total: number | null;
  exp_date: Date | null;
};

export type Inventory = {
  id: number;
  item_id: string;
  quantity: number;
  last_updated: Date;
  exp_date: Date;
  nama: string;
  image_urlL: string;
  category_id: string;
  category_name: string;
};

export type InventoryPayload = {
  item_id: string;
  quantity: number;
  exp_date: Date | null;
};
