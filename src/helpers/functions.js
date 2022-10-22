import { serverTimestamp } from 'firebase/firestore';

export const convertFromDoc = (doc) => ({
	id: doc.id,
	...doc.data(),
});
export const addTimeStamp = (item) => ({
	...item,
	createdAt: serverTimestamp(),
	updatedAt: serverTimestamp(),
});
export const updateTimeStamp = (item) => ({
	...item,
	updatedAt: serverTimestamp(),
});
export const checkFill = (obj) => {
	for (let k in obj) {
		if (!obj[k]) return false;
	}
	return true;
};
export const convertDate = (date) => {
	const d = new Date(date);
	return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
};

export const convertDateTime = (date) => {
	const d = new Date(date);
	return `${d.getHours()}:${d.getMinutes()} ${d.getDate()}.${
		d.getMonth() + 1
	}.${d.getFullYear()}`;
};
