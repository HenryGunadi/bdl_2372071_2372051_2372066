import sql from 'mssql';
import {CreateInvoicePayload, DeleteInvoiceReceiptPayload, InvoiceStoreInterface, ViewInventory} from '../types/types';
import BadRequestError from '../classes/BadReqError';
import Invoice from '../model/invoice';

class InvoiceStore implements InvoiceStoreInterface {
	private _dbConn: sql.ConnectionPool;

	constructor(dbConn: sql.ConnectionPool) {
		this._dbConn = dbConn;
	}

	async getInvoice(): Promise<sql.IRecordSet<Invoice> | BadRequestError> {
		try {
			const res = await this._dbConn.request().query('SELECT * FROM view_invoice_details');

			return res.recordset;
		} catch (err) {
			const error = new BadRequestError({code: 500, message: 'Internal server error', context: {error: `Error getting invoice : ${err}`}});
			return error;
		}
	}

	async createInvoice(payload: CreateInvoicePayload): Promise<boolean | BadRequestError> {
		try {
			const itemTable = new sql.Table();
			itemTable.columns.add('item_id', sql.VarChar(48));
			itemTable.columns.add('quantity', sql.Int);
			itemTable.columns.add('unit_price', sql.Decimal(10, 2));
			itemTable.columns.add('discount', sql.Decimal(10, 2));
			itemTable.columns.add('total', sql.Decimal(10, 2));

			payload.items.forEach((item) => {
				itemTable.rows.add(item.item_id, item.quantity, item.unit_price, item.discount, item.total);
			});

			const res = this._dbConn.request();

			for (const [name, value] of Object.entries(payload)) {
				if (name === 'items') {
					continue;
				}

				const sqlType = typeof value === 'string' ? sql.VarChar : typeof value === 'number' ? sql.Decimal(10, 2) : sql.DateTime;

				res.input(name, sqlType, value);
			}
			res.input('items', itemTable);

			const result = await res.execute('sp_insert_invoice');
			return result.rowsAffected[0] > 0;
		} catch (err) {
			const error = new BadRequestError({code: 500, message: 'Internal server error', context: {error: `Error creating invoice : ${err}`}});
			return error;
		}
	}

	async deleteInvoice(payload: DeleteInvoiceReceiptPayload): Promise<boolean | BadRequestError> {
		try {
			const res = await this._dbConn.request().input('id', payload.id).input('undo', payload.undo).execute('sp_delete_invoice');

			return res.rowsAffected[0] > 0;
		} catch (err) {
			const error = new BadRequestError({code: 500, message: 'Internal server error', context: {error: `Error deleting invoice : ${err}`}});
			return error;
		}
	}
}

export default InvoiceStore;
