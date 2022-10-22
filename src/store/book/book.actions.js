import axios from 'axios';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
	orderBy,
} from 'firebase/firestore';
import {
	deleteObject as deleteImage,
	ref,
	getDownloadURL,
	uploadBytes,
} from 'firebase/storage';
import { notify } from '../../components/Toastify/Toastify';
import { db, storage } from '../../firebase/firebase';
import { baseUrl } from '../../helpers/consts';
import {
	addTimeStamp,
	convertFromDoc,
	updateTimeStamp,
} from '../../helpers/functions';
import {
	addBookSuccess,
	deleteBookSuccess,
	getBooksSuccess,
	getMyBooksSuccess,
	getMyOrdersSuccess,
	getOneBookSuccess,
	setBooksError,
	setBooksLoading,
	updateBookSuccess,
} from './book.slice';

export const getBooks = () => async (dispatch) => {
	try {
		dispatch(setBooksLoading());
		// const q = query(collection(db, 'objects'), orderBy('rating', 'desc'));
		// const data = await getDocs(q);
		// let arr = [];
		// data.forEach((item) => {
		// 	arr.push(convertFromDoc(item));
		// });
		const { data } = await axios.get(`${baseUrl}bookslist/?format=json`);
		dispatch(getBooksSuccess(data));
	} catch (e) {
		console.log(e);
		dispatch(setBooksError(JSON.stringify(e)));
	}
};
export const getFilteredBooks = (id) => async (dispatch) => {
	try {
		dispatch(setBooksLoading());
		const q = query(
			collection(db, 'objects'),
			where('companyId', '==', id)
			// orderBy('rating', 'desc'),
		);
		const data = await getDocs(q);
		let arr = [];
		data.forEach((item) => {
			arr.push(convertFromDoc(item));
		});
		arr = arr.sort((a, b) => b.rating - a.rating);
		dispatch(getBooksSuccess(arr));
	} catch (e) {
		console.log(e);
		dispatch(setBooksError(JSON.stringify(e)));
	}
};
export const getOneBook = (id) => async (dispatch) => {
	try {
		// const data = await getDoc(doc(db, 'objects', id));
		const { data } = await axios.get(`${baseUrl}bookdetail/${id}?format=json`);
		dispatch(getOneBookSuccess(data));
	} catch (e) {
		dispatch(setBooksError(JSON.stringify(e)));
	}
};
export const addBook = (item) => async (dispatch) => {
	try {
		// const tItem = addTimeStamp(item);
		// const data = await addDoc(collection(db, 'objects'), tItem);
		// addDoc(collection(db, 'search'), {
		// 	itemId: data.id,
		// 	name: item.name,
		// 	type: 'object',
		// });
		// console.log(company);
		// updateDoc(doc(db, 'companies', company.id), { houses: company.houses + 1 });
		const { data } = await axios.post(`${baseUrl}book/create/`, item);
		// dispatch(addBookSuccess(data));
		// notify('success', 'Book created successfully');
	} catch (e) {
		console.log(e, 'create error');
		dispatch(setBooksError(JSON.stringify(e)));
	}
};

export const deleteBook = (item, company) => async (dispatch) => {
	try {
		item.image.forEach((url) => deleteImage(ref(storage, url)));
		const s = await getDocs(
			query(collection(db, 'search'), where('itemId', '==', item.id))
		);
		s.forEach((i) => deleteDoc(doc(db, 'search', i.id)));
		await deleteDoc(doc(db, 'objects', item.id));
		updateDoc(doc(db, 'companies', company.id), {
			houses: company.houses - 1,
		});

		dispatch(deleteBookSuccess(item.id));
	} catch (e) {
		dispatch(setBooksError(JSON.stringify(e)));
		console.log(e);
	}
};

export const editBook = (item) => async (dispatch) => {
	try {
		// await updateDoc(doc(db, 'objects', item.id), updateTimeStamp(item));
		const { data } = await axios.patch(
			`${baseUrl}book/update/${item.id}`,
			item
		);
		dispatch(updateBookSuccess([item.id, item]));
	} catch (e) {
		dispatch(setBooksError(JSON.stringify(e)));
	}
};

export const addImagesToBook = (item, images) => async (dispatch) => {
	try {
		const list = [...item.image];
		if (!!images) {
			for (const image of Array.from(images)) {
				const imageRef = ref(storage, `objects/${image.name}`);
				await uploadBytes(imageRef, image);
				const link = await getDownloadURL(imageRef);
				list.push(link);
			}
		}
		await updateDoc(doc(db, 'objects', item.id), {
			image: list,
		});
		dispatch(updateBookSuccess([item.id, { ...item, image: list }]));
	} catch (e) {
		dispatch(setBooksError(JSON.stringify(e)));
	}
};

export const makeOrder = (item) => async (dispatch) => {
	try {
		await axios.post(`${baseUrl}booking/create`, {
			...item,
		});
		notify('success', 'Забронировано успешно!');
	} catch (e) {
		console.log(e, 'error');
	}
};

export const getMyBooks = (user_id) => async (dispatch) => {
	try {
		const { data } = await axios.post(`${baseUrl}mybooks/`, {
			user_id: +user_id,
		});
		console.log(data, 'my books');
		dispatch(getMyBooksSuccess(data));
	} catch (e) {
		console.log(e);
	}
};
export const getMyOrders = (user_id) => async (dispatch) => {
	try {
		const { data } = await axios.post(`${baseUrl}mybookings/`, {
			user_id: +user_id,
		});
		console.log(data, 'my orders');
		dispatch(getMyOrdersSuccess(data));
	} catch (e) {
		console.log(e);
	}
};
