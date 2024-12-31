import {useEffect, useState} from 'react';
import {fetchItems} from '../utils/Item';
import {CreateItemPayload, Items} from '../types/types';

function Item() {
	// states
	const [item, setItem] = useState<Items[]>([]);
	const [createItem, setCreateItems] = useState<CreateItemPayload>();

	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<div className="w-screen h-screen justify-center items-center">
			<form action="" className="rounded-md w-1/2 h-1/2">
				<input type="text" placeholder="Product Name" />
				<input type="text" placeholder="QR Code" />
				<input type="number" placeholder="Price" />
				<input type="text" placeholder="Supplier ID" />
				<input type="expired_" placeholder="Supplier ID" />
				
			</form>
		</div>
	);
}

export default Item;
