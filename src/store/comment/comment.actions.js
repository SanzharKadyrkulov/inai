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
} from 'firebase/firestore';
import {
	deleteObject as deleteImage,
	getDownloadURL,
	ref,
	uploadBytes,
} from 'firebase/storage';
import { db, storage } from '../../firebase/firebase';
import {
	addTimeStamp,
	convertFromDoc,
	updateTimeStamp,
} from '../../helpers/functions';
import { updateCompanySuccess } from '../company/company.slice';
import { getOneBookSuccess } from '../book/book.slice';
import {
	addCommentSuccess,
	deleteCommentSuccess,
	getCommentsSuccess,
	getOneCommentSuccess,
	setCommentsError,
	setCommentsLoading,
	updateCommentSuccess,
} from './comment.slice';

// CALC

const calcRatingAdd = (val, item, prevVal, coll) => {
	const prev = item.rating * item.comments;
	const newRating = (prev + val) / (item.comments + 1);
	updateDoc(doc(db, coll, item.id), {
		rating: newRating,
		comments: item.comments + 1,
	});
	return { ...item, rating: newRating, comments: item.comments + 1 };
};

const calcRatingDel = (val, item, prevVal, coll) => {
	const prev = item.rating * item.comments;
	const newRating = (prev - val) / (item.comments - 1);

	updateDoc(doc(db, coll, item.id), {
		rating: isNaN(newRating) ? 0 : newRating,
		comments: item.comments - 1,
	});
	return {
		...item,
		rating: isNaN(newRating) ? 0 : newRating,
		comments: item.comments - 1,
	};
};

const calcRatingEdit = (val, item, prevVal, coll) => {
	const prev = item.rating * item.comments;
	const newRating = (prev - prevVal + val) / item.comments;
	updateDoc(doc(db, coll, item.id), { rating: newRating });
	return { ...item, rating: newRating };
};

// CALC

// export const getComments = () => async (dispatch) => {
// 	try {
// 		dispatch(setCommentsLoading());
// 		const data = await getDocs(collection(db, 'comments'));
// 		let arr = [];
// 		data.forEach((item) => {
// 			arr.push(convertFromDoc(item));
// 		});
// 		dispatch(getCommentsSuccess(arr));
// 	} catch (e) {
// 		console.log(e);
// 		dispatch(setCommentsError(JSON.stringify(e)));
// 	}
// };
export const getFilteredComments = (id) => async (dispatch) => {
	try {
		dispatch(setCommentsLoading());
		const q = query(collection(db, 'comments'), where('objectId', '==', id));
		const data = await getDocs(q);
		let arr = [];
		data.forEach((item) => {
			arr.push(convertFromDoc(item));
		});
		arr = arr.sort((a, b) => b.date - a.date);
		dispatch(getCommentsSuccess(arr));
	} catch (e) {
		console.log(e);
		dispatch(setCommentsError(JSON.stringify(e)));
	}
};
// export const getOneComment = (id) => async (dispatch) => {
// 	try {
// 		const data = await getDoc(doc(db, 'comments', id));
// 		dispatch(getOneCommentSuccess(convertFromDoc(data)));
// 	} catch (e) {
// 		dispatch(setCommentsError(JSON.stringify(e)));
// 	}
// };
export const addComment =
	(comm, item, prev, company, images, videos) => async (dispatch) => {
		try {
			const list = [];
			if (!!images) {
				for (const image of Array.from(images)) {
					const imageRef = ref(storage, `comments/${image.name}`);
					await uploadBytes(imageRef, image);
					const link = await getDownloadURL(imageRef);
					list.push(link);
				}
			}
			const list2 = [];
			if (!!videos) {
				for (const video of Array.from(videos)) {
					const videoRef = ref(storage, `comments/${video.name}`);
					await uploadBytes(videoRef, video);
					const link = await getDownloadURL(videoRef);
					list2.push(link);
				}
			}
			const tComm = { ...addTimeStamp(comm), image: list, video: list2 };
			const data = await addDoc(collection(db, 'comments'), tComm);
			const newItem = calcRatingAdd(comm.rating, item, prev, 'objects');
			const newComp = calcRatingAdd(comm.rating, company, prev, 'companies');
			dispatch(addCommentSuccess({ id: data.id, ...tComm }));
			dispatch(getOneBookSuccess(newItem));
			dispatch(updateCompanySuccess([newComp.id, newComp]));
		} catch (e) {
			dispatch(setCommentsError(JSON.stringify(e)));
		}
	};

export const deleteComment =
	(comm, item, prev, company) => async (dispatch) => {
		try {
			comm.image.forEach((url) => deleteImage(ref(storage, url)));
			comm.video.forEach((url) => deleteImage(ref(storage, url)));
			await deleteDoc(doc(db, 'comments', comm.id));
			const newItem = calcRatingDel(comm.rating, item, 'sdf', 'objects');
			const newComp = calcRatingDel(comm.rating, company, 'asfad', 'companies');

			dispatch(deleteCommentSuccess(comm.id));
			dispatch(getOneBookSuccess(newItem));
			dispatch(updateCompanySuccess([newComp.id, newComp]));
		} catch (e) {
			dispatch(setCommentsError(JSON.stringify(e)));
		}
	};

export const editComment =
	(comm, item, prevComm, company, images, videos) => async (dispatch) => {
		try {
			const list = [];
			const list2 = [];
			if (!!images) {
				for (const image of Array.from(images)) {
					const imageRef = ref(storage, `comments/${image.name}`);
					await uploadBytes(imageRef, image);
					const link = await getDownloadURL(imageRef);
					list.push(link);
				}
			}
			if (!!videos) {
				for (const video of Array.from(videos)) {
					const videoRef = ref(storage, `comments/${video.name}`);
					await uploadBytes(videoRef, video);
					const link = await getDownloadURL(videoRef);
					list2.push(link);
				}
			}
			const tComm = { ...updateTimeStamp(comm) };
			if (list.length > 0) {
				comm.image.forEach((url) => deleteImage(ref(storage, url)));
				tComm.image = list;
			}
			if (list2.length > 0) {
				comm.video.forEach((url) => deleteImage(ref(storage, url)));
				tComm.video = list2;
			}

			await updateDoc(doc(db, 'comments', tComm.id), tComm);
			const newItem = calcRatingEdit(
				tComm.rating,
				item,
				prevComm.rating,
				'objects'
			);
			const newComp = calcRatingEdit(
				tComm.rating,
				company,
				prevComm.rating,
				'companies'
			);

			dispatch(updateCommentSuccess([tComm.id, tComm]));
			dispatch(getOneBookSuccess(newItem));
			dispatch(updateCompanySuccess([newComp.id, newComp]));
		} catch (e) {
			dispatch(setCommentsError(JSON.stringify(e)));
		}
	};
