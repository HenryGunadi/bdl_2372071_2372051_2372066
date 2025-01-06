class Receipt {
  private _id: string | undefined = undefined;
  private _payment_method: string;
  private _total_subtotal: number;
  private _total_discount: number;
  private _total_amount: number;
  private _tax_id: number;
  private _created_at: Date | undefined = undefined;

  // Constructor
  constructor(payment_method: string, total_subtotal: number, total_discount: number, total_amount: number, tax_id: number, id?: string, created_at?: Date) {
    this._id = id;
    this._created_at = created_at;
    this._payment_method = payment_method;
    this._total_subtotal = total_subtotal;
    this._total_discount = total_discount;
    this._total_amount = total_amount;
    this._tax_id = tax_id;
  }

  // ID
  get id(): string | undefined {
    return this._id;
  }
  set id(id: string | undefined) {
    this._id = id;
  }

  // Date
  get created_at(): Date | undefined {
    return this._created_at;
  }

  set created_at(date: Date) {
    this._created_at = date;
  }

  // Payment Method
  get paymentMethod(): string {
    return this._payment_method;
  }
  set paymentMethod(paymentMethod: string) {
    this._payment_method = paymentMethod;
  }

  // Subtotal
  get totalSubtotal(): number {
    return this._total_subtotal;
  }
  set totalSubtotal(totalSubtotal: number) {
    this._total_subtotal = totalSubtotal;
  }

  // Discount
  get totalDiscount(): number {
    return this._total_discount;
  }
  set totalDiscount(totalDiscount: number) {
    this._total_discount = totalDiscount;
  }

  // Amount
  get totalAmount(): number {
    return this._total_amount;
  }
  set totalAmount(totalAmount: number) {
    this._total_amount = totalAmount;
  }

  // Tax ID
  get taxId(): number {
    return this._tax_id;
  }
  set taxId(taxId: number) {
    this._tax_id = taxId;
  }
}

export default Receipt;
