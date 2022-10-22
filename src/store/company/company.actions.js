import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { notify } from '../../components/Toastify/Toastify';
import { db, storage } from '../../firebase/firebase';
import {
	addTimeStamp,
	convertFromDoc,
	updateTimeStamp,
} from '../../helpers/functions';
import {
	setCompaniesError,
	setCompaniesLoading,
	getCompaniesSuccess,
	addCompanySuccess,
	deleteCompanySuccess,
	updateCompanySuccess,
	getOneCompanySuccess,
} from './company.slice';

export const getCompanies = () => async (dispatch) => {
	try {
		dispatch(setCompaniesLoading());
		const q = query(collection(db, 'companies'), orderBy('rating', 'desc'));
		const data = await getDocs(q);
		let arr = [];
		data.forEach((item) => {
			arr.push(convertFromDoc(item));
		});
		dispatch(getCompaniesSuccess(arr));
	} catch (e) {
		console.log(e);
		dispatch(setCompaniesError(JSON.stringify(e)));
	}
};
export const getOneCompany = (id) => async (dispatch) => {
	try {
		const data = await getDoc(doc(db, 'companies', id));
		dispatch(getOneCompanySuccess(convertFromDoc(data)));
	} catch (e) {
		dispatch(setCompaniesError(JSON.stringify(e)));
	}
};
export const addCompany = (item) => async (dispatch) => {
	try {
		const tItem = addTimeStamp(item);
		const data = await addDoc(collection(db, 'companies'), tItem);
		addDoc(collection(db, 'search'), {
			itemId: data.id,
			name: item.name,
			type: 'company',
		});
		dispatch(addCompanySuccess({ id: data.id, ...tItem }));
		notify('success', 'Company created successfully');
	} catch (e) {
		dispatch(setCompaniesError(JSON.stringify(e)));
	}
};

export const deleteCompany = (item) => async (dispatch) => {
	try {
		await deleteObject(ref(storage, `${item.image[0]}`));
		const s = await getDocs(
			query(collection(db, 'search'), where('itemId', '==', item.id))
		);
		s.forEach((i) => deleteDoc(doc(db, 'search', i.id)));
		await deleteDoc(doc(db, 'companies', item.id));

		dispatch(deleteCompanySuccess(item.id));
	} catch (e) {
		dispatch(setCompaniesError(JSON.stringify(e)));
	}
};

export const editCompany = (item) => async (dispatch) => {
	try {
		await updateDoc(doc(db, 'companies', item.id), updateTimeStamp(item));
		dispatch(updateCompanySuccess([item.id, item]));
	} catch (e) {
		dispatch(setCompaniesError(JSON.stringify(e)));
	}
};
