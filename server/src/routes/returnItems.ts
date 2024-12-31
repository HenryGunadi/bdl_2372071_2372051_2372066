import {NextFunction, Request, Response, Router} from 'express';
import {DB} from '../db/db';
import express from 'express';
import ReturnItemsStore from '../services/returnItemsStore';
import ReturnItemsController from '../controller/returnItemsController';
import {deleteReturnItemValidator, updateReturnItemsValidator} from '../validators/returnItemsValidator';
import {validationResult} from 'express-validator';
import BadRequestError from '../classes/BadReqError';

const returnItemsRouter = (db: DB): Router => {
	const router = express.Router();
	const returnItemsStore = new ReturnItemsStore(db.getConn());
	const returnItemsController = new ReturnItemsController(returnItemsStore);

	router.get('/search', (req: Request, res: Response, next: NextFunction) => {
		returnItemsController.getReturnItems(req, res, next);
	});

	router.patch('/update', updateReturnItemsValidator, (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const err = new BadRequestError({code: 400, message: 'Invalid payload validation', context: {error: errors.array()}});
			return next(err);
		}

		returnItemsController.updateReturnItems(req, res, next);
	});

	router.delete('/delete', deleteReturnItemValidator, (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const err = new BadRequestError({code: 400, message: 'Invalid payload validation', context: {error: errors.array()}});
			return next(err);
		}

		returnItemsController.deleteReturnItems(req, res, next);
	});

	return router;
};

export default returnItemsRouter;
