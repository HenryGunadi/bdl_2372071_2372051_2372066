import {NextFunction, Request, Response, Router} from 'express';
import {DB} from '../db/db';
import express from 'express';
import InventoryStore from '../services/inventoryStore';
import InventoryController from '../controller/inventoryController';

const inventoryRouter = (db: DB): Router => {
	const router = express.Router();
	const inventoryStore = new InventoryStore(db.getConn());
	const inventoryController = new InventoryController(inventoryStore);

	router.get('/search', (req: Request, res: Response, next: NextFunction) => {
		inventoryController.getInventories(req, res, next);
	});

	router.patch('/update', (req: Request, res: Response, next: NextFunction) => {
		inventoryController.getInventories(req, res, next);
	});

	router.delete('/delete', (req: Request, res: Response, next: NextFunction) => {
		inventoryController.deleteInventory(req, res, next);
	});

	return router;
};

export default inventoryRouter;
