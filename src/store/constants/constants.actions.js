import axios from 'axios';
import { baseUrl } from '../../helpers/consts';
import { getDaysSuccess, getMaxBooksSuccess } from './constants.slice';

export const getConstants = () => async (dispatch) => {
	try {
		const {
			data: { days, books },
		} = await axios.get(`${baseUrl}constats/1`);
		dispatch(getDaysSuccess(days));
		dispatch(getMaxBooksSuccess(books));
	} catch (e) {
		console.log(e, 'error');
	}
};

export const editMaxDays = (int) => async (dispatch) => {
	try {
		const { data } = await axios.post(`${baseUrl}`, {
			int,
		});
		dispatch(getConstants());
	} catch (e) {
		console.log(e);
	}
};

export const editMaxBooks = (int) => async (dispatch) => {
	try {
		const { data } = await axios.post(`${baseUrl}`, {
			int,
		});
		dispatch(getConstants());
	} catch (e) {
		console.log(e);
	}
};
