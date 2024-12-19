class Supplier {
  private _id: string | undefined = undefined;
  private _name: string;
  private _phone_number: string;
  private _email: string;
  private _address: string;
  private _country: string;
  private _city: string;
  private _postal_code: string | null = null;
  private _created_at: Date;

  constructor(name: string, phone_number: string, email: string, address: string, country: string, city: string, postal_code: string | null, id?: string) {
    const current_date: Date = new Date();

    this._id = id;
    this._name = name;
    this._phone_number = phone_number;
    this._email = email;
    this._address = address;
    this._country = country;
    this._city = city;
    this._postal_code = postal_code;
    this._created_at = current_date;
  }

  // Getters
  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get phoneNumber(): string {
    return this._phone_number;
  }

  get email(): string {
    return this._email;
  }

  get address(): string {
    return this._address;
  }

  get country(): string {
    return this._country;
  }

  get city(): string {
    return this._city;
  }

  get postalCode(): string | null {
    return this._postal_code;
  }

  get createdAt(): Date {
    return this._created_at;
  }

  // Setters
  set name(name: string) {
    this._name = name;
  }

  set phoneNumber(phoneNumber: string) {
    this._phone_number = phoneNumber;
  }

  set email(email: string) {
    this._email = email;
  }

  set address(address: string) {
    this._address = address;
  }

  set country(country: string) {
    this._country = country;
  }

  set city(city: string) {
    this._city = city;
  }

  set postalCode(postalCode: string | null) {
    this._postal_code = postalCode;
  }

  set createdAt(createdAt: Date) {
    this._created_at = createdAt;
  }
}

export default Supplier;
