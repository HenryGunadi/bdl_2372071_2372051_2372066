class Admin {
  private _id: string | null = null;
  private _name: string;
  private _password: string;
  private _email: string;
  private _phone_number: string;

  constructor(id: string | null, name: string, password: string, email: string, phone_number: string) {
    this._id = id;
    this._name = name;
    this._password = password;
    this._email = email;
    this._phone_number = phone_number;
  }

  // Getters
  get id(): string | null {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password;
  }

  get email(): string {
    return this._email;
  }

  get phone_number(): string {
    return this._phone_number;
  }

  // Setters
  set id(value: string) {
    this._id = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set password(value: string) {
    if (value.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }
    this._password = value;
  }

  set email(value: string) {
    if (!value.includes("@")) {
      throw new Error("Invalid email address.");
    }
    this._email = value;
  }

  set phone_number(value: string) {
    if (!/^\d+$/.test(value)) {
      throw new Error("Phone number must contain only digits.");
    }
    this._phone_number = value;
  }
}

export default Admin;
