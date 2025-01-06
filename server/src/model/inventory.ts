export default class Inventory {
  private _id: number | undefined = undefined;
  private _item_id: string;
  private _quantity: number;
  private _last_updated: Date | undefined = undefined;
  private _expired_date: Date;

  constructor(item_id: string, quantity: number, expired_date: Date, last_updated?: Date, id?: number) {
    this._id = id;
    this._item_id = item_id;
    this._quantity = quantity;
    this._last_updated = last_updated;
    this._expired_date = expired_date;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public set id(value: number | undefined) {
    this._id = value;
  }

  public get itemId(): string {
    return this._item_id;
  }

  public set itemId(value: string) {
    this._item_id = value;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(value: number) {
    if (value < 0) {
      throw new Error("Quantity cannot be negative.");
    }
    this._quantity = value;
  }

  public get lastUpdated(): Date | undefined {
    return this._last_updated;
  }

  public set lastUpdated(value: Date) {
    this._last_updated = value;
  }
}
