import {NextFunction, Request, Response} from 'express';
import InvoiceStore from '../services/invoiceStore';
import BadRequestError from '../classes/BadReqError';
import {CreateInvoicePayload, DeleteInvoiceReceiptPayload} from '../types/types';

class InvoiceController {
	private _store: InvoiceStore;

	constructor(store: InvoiceStore) {
		this._store = store;
	}

	getInvoice = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const queryRes = await this._store.getInvoice();

			if (queryRes instanceof BadRequestError) {
				return next(queryRes);
			}

			return res.status(200).json({message: 'success', invoice: queryRes});
		} catch (err) {
			const error = new BadRequestError({code: 500, message: 'Internal server error', context: {error: `${err}`}});
			return error;
		}
	};

	createInvoice = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = req.body as CreateInvoicePayload;
			const queryRes = await this._store.createInvoice(payload);

			if (queryRes instanceof BadRequestError) {
				return next(queryRes);
			} else {
				if (!queryRes) {
					const error = new BadRequestError({code: 500, message: 'Something went wrong', context: {error: 'No rows are affected'}});
					return next(error);
				}

				return res.status(200).json({message: 'success'});
			}
		} catch (err) {
			const error = new BadRequestError({code: 500, message: 'Internal server error', context: {error: `${err}`}});
			return error;
		}
	};

	deleteInvoice = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = req.body as DeleteInvoiceReceiptPayload;
			const queryRes = await this._store.deleteInvoice(payload);

			if (queryRes instanceof BadRequestError) {
				return next(queryRes);
			} else {
				if (!queryRes) {
					const error = new BadRequestError({code: 500, message: 'Something went wrong', context: {error: 'No rows are affected'}});
					return next(error);
				}

				return res.status(200).json({message: 'success'});
			}
		} catch (err) {
			const error = new BadRequestError({code: 500, message: 'Internal server error', context: {error: `${err}`}});
			return error;
		}
	};
}

export default InvoiceController;
