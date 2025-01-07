import {NextFunction, Request, Response} from 'express';
import InvoiceStore from '../services/purchaseOrderStore';
import BadRequestError from '../classes/BadReqError';
import {CreatePOPayload, DeletePOReceiptPayload, UpdatePOPayload} from '../types/types';

class PurchaseOrderController {
	private _store: InvoiceStore;

	constructor(store: InvoiceStore) {
		this._store = store;
	}

	getPO = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const queryRes = await this._store.getPO();

			if (queryRes instanceof BadRequestError) {
				return next(queryRes);
			}

			return res.status(200).json({message: 'success', invoice: queryRes});
		} catch (err) {
			const error = new BadRequestError({code: 500, message: 'Internal server error', context: {error: `${err}`}});
			return error;
		}
	};

	createPO = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = req.body as CreatePOPayload;
			const queryRes = await this._store.createPO(payload);

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

	deletePO = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = req.body as DeletePOReceiptPayload;
			const queryRes = await this._store.deletePO(payload);

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

	updatePO = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const payload = req.body as UpdatePOPayload;
			const queryRes = await this._store.updatePO(payload);

			if (queryRes instanceof BadRequestError) {
				return next(queryRes);
			}

			if (!queryRes) {
				const error = new BadRequestError({
					code: 500,
					message: 'Something went wrong updating PO',
					context: {error: 'No rows are updated'},
				});
				return next(error);
			}

			return res.status(200).json({message: 'success'});
		} catch (err) {
			const error = new BadRequestError({code: 500, message: 'Internal server error', context: {error: `${err}`}});
			return error;
		}
	};
}

export default PurchaseOrderController;
