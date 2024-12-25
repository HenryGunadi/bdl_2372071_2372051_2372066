import {NextFunction, Request, Response, Router} from 'express';
import {DB} from '../db/db';
import express from 'express';
import InvoiceStore from '../services/invoiceStore';
import InvoiceController from '../controller/invoiceController';

const invoiceRouter = (db: DB): Router => {
	const router = express.Router();
	const invoiceStore = new InvoiceStore(db.getConn());
	const invoiceController = new InvoiceController(invoiceStore);

	router.get('/search', (req: Request, res: Response, next: NextFunction) => {
		invoiceController.getInvoice(req, res, next);
	});

	router.post('/create', (req: Request, res: Response, next: NextFunction) => {
		invoiceController.createInvoice(req, res, next);
	});

	router.delete('/delete', (req: Request, res: Response, next: NextFunction) => {
		invoiceController.deleteInvoice(req, res, next);
	});

	return router;
};

export default invoiceRouter;
