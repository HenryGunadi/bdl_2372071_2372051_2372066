class Category {
  private _id: string | undefined = undefined;
  private _category_name: string;
  private _created_at: Date | undefined = undefined;

  constructor(category_name: string, created_at?: Date, id?: string) {
    this._id = id;
    this._category_name = category_name;
    this._created_at = created_at;
  }

  // Getter and setter for _id
  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  // Getter and setter for _category_name
  get category_name(): string {
    return this._category_name;
  }

  set category_name(value: string) {
    this._category_name = value;
  }

  // Getter and setter for _created_at
  get created_at(): Date | undefined {
    return this._created_at;
  }

  set created_at(value: Date) {
    this._created_at = value;
  }
}

export default Category;
