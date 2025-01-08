class PurchaseOrder {
	private _id: string | undefined = undefined;
	private _payment_method: string;
	private _currency: string;
	private _total_subtotal: number;
	private _total_discount: number;
	private _total_tax: number;
	private _total_amount_due: number;
	private _created_at: Date | undefined = undefined;
	private _supplier_id: string;
	private _status: 'Ongoing' | 'Accepted' | 'Terminated' = 'Ongoing';

	constructor(
		payment_method: string,
		currency: string,
		total_subtotal: number,
		total_discount: number,
		total_tax: number,
		total_amount_due: number,
		supplier_id: string
	) {
		this._payment_method = payment_method;
		this._currency = currency;
		this._total_subtotal = total_subtotal;
		this._total_discount = total_discount;
		this._total_tax = total_tax;
		this._total_amount_due = total_amount_due;
		this._created_at = new Date(); // Automatically set created_at to now
		this._supplier_id = supplier_id;
	}

	// Getters and Setters

	get id(): string | undefined {
		return this._id;
	}

	set id(value: string | undefined) {
		this._id = value;
	}

	get payment_method(): string {
		return this._payment_method;
	}

	set payment_method(value: string) {
		this._payment_method = value;
	}

	get currency(): string {
		return this._currency;
	}

	set currency(value: string) {
		this._currency = value;
	}

	get total_subtotal(): number {
		return this._total_subtotal;
	}

	set total_subtotal(value: number) {
		this._total_subtotal = value;
	}

	get total_discount(): number {
		return this._total_discount;
	}

	set total_discount(value: number) {
		this._total_discount = value;
	}

	get total_tax(): number {
		return this._total_tax;
	}

	set total_tax(value: number) {
		this._total_tax = value;
	}

	get total_amount_due(): number {
		return this._total_amount_due;
	}

	set total_amount_due(value: number) {
		this._total_amount_due = value;
	}

	get created_at(): Date | undefined {
		return this._created_at;
	}

	set created_at(value: Date | undefined) {
		this._created_at = value;
	}

	set status(value: 'Ongoing' | 'Accepted' | 'Terminated') {
		this._status = value;
	}

	get status() {
		return this._status;
	}

	set supplier_id(value: string) {
		this._supplier_id = value;
	}

	get supplier_id() {
		return this._supplier_id;
	}
}

export default PurchaseOrder;
