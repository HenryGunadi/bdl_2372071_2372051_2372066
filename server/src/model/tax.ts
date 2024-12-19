class Tax {
  private _id: string | undefined = undefined;
  private _tax_rate: number;
  private _start_date: Date;
  private _end_date: Date;
  private _created_at: Date;

  // Constructor
  constructor(tax_rate: number, start_date: Date, end_date: Date, created_at: Date, id?: string) {
    this._id = id;
    this._tax_rate = tax_rate;
    this._start_date = start_date;
    this._end_date = end_date;
    this._created_at = created_at;
  }

  // Getter and Setter for ID
  get id(): string | undefined {
    return this._id;
  }
  set id(id: string | undefined) {
    this._id = id;
  }

  // Getter and Setter for Tax Rate
  get taxRate(): number {
    return this._tax_rate;
  }
  set taxRate(tax_rate: number) {
    this._tax_rate = tax_rate;
  }

  // Getter and Setter for Start Date
  get startDate(): Date {
    return this._start_date;
  }
  set startDate(start_date: Date) {
    this._start_date = start_date;
  }

  // Getter and Setter for End Date
  get endDate(): Date {
    return this._end_date;
  }
  set endDate(end_date: Date) {
    this._end_date = end_date;
  }

  // Getter and Setter for Created At
  get createdAt(): Date {
    return this._created_at;
  }
  set createdAt(created_at: Date) {
    this._created_at = created_at;
  }
}

export default Tax;
