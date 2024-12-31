import axios from 'axios';
import {CreateItemPayload} from '../types/types';

const backendBaseAPI: string = import.meta.env.VITE_BACKEND_API || '';

async function fetchItems() {
	try {
		const response = await axios.get(`${backendBaseAPI}/api/items/search`);
		console.log(response.data);
	} catch (err) {
		console.error('Error fetching items : ', err);
	}
}

async function createItem(item: CreateItemPayload) {
	try {
		const response = await axios.post(`${backendBaseAPI}/api/items/create`, item, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log(response.data);
	} catch (err) {
		console.error('Error creating an item : ', err);
	}
}

export {fetchItems, createItem};
