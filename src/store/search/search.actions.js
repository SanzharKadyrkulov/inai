import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { convertFromDoc } from '../../helpers/functions';
import { getSearchSuccess } from './search.slice';

export const getSearch = () => async (dispatch) => {
	try {
		const data = await getDocs(collection(db, 'search'));
		let arr = [];
		data.forEach((item) => {
			arr.push(convertFromDoc(item));
		});
		dispatch(getSearchSuccess(arr));
	} catch (e) {
		console.log(e);
		// dispatch(setObjectsError(JSON.stringify(e)));
	}
};
