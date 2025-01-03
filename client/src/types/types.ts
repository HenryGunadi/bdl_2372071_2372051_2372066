export type CreateItemPayload = {
  nama: string;
  qrcode: string;
  price: number;
  supplier_id: string;
  description: string;
  discount: number | null;
  image: File | null;
  category_id: string;
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
