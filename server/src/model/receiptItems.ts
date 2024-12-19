class ReceiptItems {
  private _id: string | undefined = undefined;
  private _item_id: string;
  private _receipt_id: string;
  private _unit_price: number;
  private _quantity: number;
  private _unit_discount: number;
  private _total: number;

  // Constructor
  constructor(item_id: string, receipt_id: string, unit_price: number, quantity: number, unit_discount: number, total: number, id?: string) {
    this._id = id;
    this._item_id = item_id;
    this._receipt_id = receipt_id;
    this._unit_price = unit_price;
    this._quantity = quantity;
    this._unit_discount = unit_discount;
    this._total = total;
  }

  // Getter and Setter methods

  // ID
  get id(): string | undefined {
    return this._id;
  }
  set id(id: string | undefined) {
    this._id = id;
  }

  // Item ID
  get itemId(): string {
    return this._item_id;
  }
  set itemId(itemId: string) {
    this._item_id = itemId;
  }

  // Receipt ID
  get receiptId(): string {
    return this._receipt_id;
  }
  set receiptId(receiptId: string) {
    this._receipt_id = receiptId;
  }

  // Unit Price
  get unitPrice(): number {
    return this._unit_price;
  }
  set unitPrice(unitPrice: number) {
    this._unit_price = unitPrice;
  }

  // Quantity
  get quantity(): number {
    return this._quantity;
  }
  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  // Unit Discount
  get unitDiscount(): number {
    return this._unit_discount;
  }
  set unitDiscount(unitDiscount: number) {
    this._unit_discount = unitDiscount;
  }

  // Total
  get total(): number {
    return this._total;
  }
  set total(total: number) {
    this._total = total;
  }
}

export default ReceiptItems;
