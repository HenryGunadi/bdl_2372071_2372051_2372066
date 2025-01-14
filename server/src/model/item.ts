class Item {
  private _id: string | undefined = undefined;
  private _nama: string;
  private _price: number;
  private _supplier_id: string;
  private _desc: string;
  private _discount: number | null = null;
  private _image_url: string;
  private _category_id: number;
  private _buy_price: number;

  constructor(nama: string, price: number, supplier_id: string, desc: string, image_url: string, category_id: number, discount: number | null, buy_price: number, id?: string) {
    this._id = id;
    this._nama = nama;
    this._buy_price = buy_price;
    this._price = price;
    this._supplier_id = supplier_id;
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

  get price(): number {
    return this._price;
  }

  get supplierId(): string {
    return this._supplier_id;
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

  get categoryId(): number {
    return this._category_id;
  }

  get buyPrice(): number {
    return this._buy_price;
  }

  // Setters
  set nama(nama: string) {
    this._nama = nama;
  }

  set buyPrice(buyPrice: number) {
    this._buy_price = buyPrice;
  }

  set price(price: number) {
    this._price = price;
  }

  set supplierId(supplierId: string) {
    this._supplier_id = supplierId;
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

  set categoryId(categoryId: number) {
    this._category_id = categoryId;
  }
}

export default Item;
