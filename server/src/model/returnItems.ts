import internal from "stream";

class ReturnItems {
  private _id: string | undefined = undefined;
  private _item_id: string;
  private _quantity: number;
  private _return_date: Date;
  private created_at: Date;

  constructor(items_id: string, quantity: number, return_date: Date, created_at: Date, id?: string) {
    this._id = id;
    this._item_id = items_id;
    this._quantity = quantity;
    this._return_date = return_date;
    this.created_at = created_at;
  }

  // Getters
  public get id(): string | undefined {
    return this._id;
  }

  public get items_id(): string {
    return this._item_id;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public get return_date(): Date {
    return this._return_date;
  }

  public get createdAt(): Date {
    return this.created_at;
  }

  // Setters
  public set id(value: string | undefined) {
    this._id = value;
  }

  public set items_id(value: string) {
    this._item_id = value;
  }

  public set quantity(value: number) {
    this._quantity = value;
  }

  public set return_date(value: Date) {
    this._return_date = value;
  }

  public set createdAt(value: Date) {
    this.created_at = value;
  }
}

export default ReturnItems;
