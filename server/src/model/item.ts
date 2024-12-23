class Item {
  private _id: string | undefined = undefined;
  private _nama: string;
  private _qrcode: string;
  private _price: number;
  private _supplier_id: string;
  private _expired_date: Date;
  private _desc: string;
  private _discount: number | null = null;
  private _image_url: string;
  private _category_id: string;

  constructor(nama: string, qrcode: string, price: number, supplier_id: string, expired_date: Date, desc: string, image_url: string, category_id: string, discount: number | null, id?: string) {
    this._id = id;
    this._nama = nama;
    this._qrcode = qrcode;
    this._price = price;
    this._supplier_id = supplier_id;
    this._expired_date = expired_date;
    this._desc = desc;
    this._discount = discount;
    this._image_url = image_url;
    this._category_id = category_id;
  }

  // Getters
  get id(): string | undefined {
    return this._id;
  }

  get nama(): string {
    return this._nama;
  }

  get qrcode(): string {
    return this._qrcode;
  }

  get price(): number {
    return this._price;
  }

  get supplierId(): string {
    return this._supplier_id;
  }

  get expiredDate(): Date {
    return this._expired_date;
  }

  get desc(): string {
    return this._desc;
  }

  get discount(): number | null {
    return this._discount;
  }

  get imageUrl(): string {
    return this._image_url;
  }

  get categoryId(): string {
    return this._category_id;
  }

  // Setters
  set nama(nama: string) {
    this._nama = nama;
  }

  set qrcode(qrcode: string) {
    this._qrcode = qrcode;
  }

  set price(price: number) {
    this._price = price;
  }

  set supplierId(supplierId: string) {
    this._supplier_id = supplierId;
  }

  set expiredDate(expiredDate: Date) {
    this._expired_date = expiredDate;
  }

  set desc(desc: string) {
    this._desc = desc;
  }

  set discount(discount: number) {
    this._discount = discount;
  }

  set imageUrl(imageUrl: string) {
    this._image_url = imageUrl;
  }

  set categoryId(categoryId: string) {
    this._category_id = categoryId;
  }
}

export default Item;
