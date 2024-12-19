class Customer {
  private _id: string | undefined = undefined;
  private _name: string;
  private _email: string;
  private _address: string;
  private _phone_number: string;
  private _created_at: Date;

  // Constructor
  constructor(name: string, email: string, address: string, phone_number: string, created_at: Date, id?: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._address = address;
    this._phone_number = phone_number;
    this._created_at = created_at;
  }

  // Getter and Setter for ID
  get id(): string | undefined {
    return this._id;
  }
  set id(id: string | undefined) {
    this._id = id;
  }

  // Getter and Setter for Name
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  // Getter and Setter for Email
  get email(): string {
    return this._email;
  }
  set email(email: string) {
    this._email = email;
  }

  // Getter and Setter for Address
  get address(): string {
    return this._address;
  }
  set address(address: string) {
    this._address = address;
  }

  // Getter and Setter for Phone Number
  get phoneNumber(): string {
    return this._phone_number;
  }
  set phoneNumber(phone_number: string) {
    this._phone_number = phone_number;
  }

  // Getter and Setter for Created At
  get createdAt(): Date {
    return this._created_at;
  }
  set createdAt(created_at: Date) {
    this._created_at = created_at;
  }
}

export default Customer;
