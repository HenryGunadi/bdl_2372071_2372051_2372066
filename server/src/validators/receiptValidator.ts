import exp from 'constants';
import {query} from 'express-validator';
import {body} from 'express-validator';

export const createReceiptValidator = [
	body('payment_method').not().isEmpty().withMessage('Payment method is required'),
	body('total_subtotal').not().isEmpty().withMessage('Subtotal is required').isFloat({gt: 0}).withMessage('Subtoal must be a valid number'),
	body('total_discount')
		.not()
		.isEmpty()
		.withMessage('Total discount is required')
		.isFloat({gt: 0})
		.withMessage('Subtoal must be a valid number'),
	body('total_amount')
		.not()
		.isEmpty()
		.withMessage('Total amount is required')
		.isFloat({gt: 0})
		.withMessage('Subtoal must be a valid number'),
	body('tax_id').not().isEmpty().withMessage('Tax id  is required'),
	body('items').isArray({min: 1}).withMessage('Items must be a non empty array'),
	body('items.*.item_id').not().isEmpty().withMessage('Item ID is required').isString().withMessage('Item ID must be a string'),
	body('items.*.quantity')
		.not()
		.isEmpty()
		.withMessage('Quantity is required')
		.isInt({gt: 0})
		.withMessage('Quantity must be a positive integer'),
];

export const deleteReceiptValidator = [
	body('id').notEmpty().withMessage('Receipt id is required'),
	body('undo').notEmpty().withMessage('Undo argument is required').isNumeric().withMessage('Undo argument must be a valid number'),
];
