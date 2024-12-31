export type CreateItemPayload = {
	nama: string;
	qrcode: string;
	price: number;
	supplier_id: string;
	expired_date: Date;
	description: string;
	discount: number | null;
	image_url: string;
	category_id: string;
};

export type Items = {
	id: string;
	nama: string;
	description: string;
	created_at: string;
	expired_date: string;
	image_url: string;
	discount: number;
	price: number;
	category_id: number;
	qrcode: string;
	supplier_id: string;
};
