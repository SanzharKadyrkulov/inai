import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
	signOut,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { notify } from '../../components/Toastify/Toastify';
import { auth, db } from '../../firebase/firebase';
import { addTimeStamp, convertFromDoc } from '../../helpers/functions';
import { loginUserSuccess, setUserLoading } from './user.slice';
import { baseUrl } from '../../helpers/consts';

const generateUserDocument = async (user, additionalData) => {
	if (!user) return;

	const querySnapshot = await getDoc(doc(db, 'users', `${user.uid}`));
	if (!querySnapshot.exists()) {
		const { email } = user;
		try {
			await setDoc(
				doc(db, 'users', `${user.uid}`),
				addTimeStamp({
					email,
					...additionalData,
				})
			);
		} catch (error) {
			notify('error', 'Error creating user document');
		}
	}
};

const getUserDocument = (uid) => async (dispatch) => {
	if (!uid) return null;
	try {
		const userDoc = await getDoc(doc(db, 'users', `${uid}`));
		if (userDoc.exists()) {
			const user = convertFromDoc(userDoc);
			dispatch(loginUserSuccess(user));
		}
	} catch (error) {
		notify('error', 'Error fetching user');
	}
};

export const registerUser =
	({ email, password, firstName, lastName }, navigate) =>
	async (dispatch) => {
		try {
			dispatch(setUserLoading());

			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await generateUserDocument(user, { role: 'user', firstName, lastName });
			dispatch(getUserDocument(user.uid));
			navigate(-2);
			notify('success', 'Регистрация прошла успешно!');
		} catch (err) {
			dispatch(loginUserSuccess(null));
			switch (err.code) {
				case 'auth/invalid-email':
					notify('error', 'Некорректная почта!');
					break;
				case 'auth/email-already-in-use':
					notify('error', 'Пользователь с такой почтой уже существует!');
					break;
				case 'auth/weak-password':
					notify('error', 'Пароль должен быть не менее 6 символов!');
					break;
				default:
					notify('error', 'Произошла ошибка при регистрации!');
			}
		}
	};

// export const loginUser =
// 	({ email, password }, navigate) =>
// 	async (dispatch) => {
// 		try {
// 			dispatch(setUserLoading());
// 			await signInWithEmailAndPassword(auth, email, password);
// 			navigate(-1);
// 			notify('success', 'Вы успешно вошли!');
// 		} catch (err) {
// 			dispatch(loginUserSuccess(null));
// 			switch (err.code) {
// 				case 'auth/invalid-email':
// 					notify('error', 'Некорректная почта!');
// 					break;
// 				case 'auth/user-not-found':
// 					notify('error', 'Пользователя с такой почтой не существует!');
// 					break;
// 				case 'auth/wrong-password':
// 					notify('error', 'Неверный пароль!');
// 					break;
// 				default:
// 					notify('error', 'Произошла ошибка при входе!');
// 			}
// 		}
// 	};

export const loginUser = (user, navigate) => async (dispatch) => {
	try {
		dispatch(setUserLoading());
		const res = await axios.post(`${baseUrl}auth/jwt/create`, user);
		const decodedToken = jwt_decode(res.data.access);
		const { data } = await axios.get(
			`${baseUrl}user/detail/${decodedToken.user_id}`
		);
		// const decodedUser = {
		// 	email: decoded.id,
		// 	exp: decoded.exp,
		// 	iat: decoded.iat,
		// 	id: decoded.email,
		// };
		localStorage.setItem('token', res.data.access);
		dispatch(loginUserSuccess(data));
		navigate('/books');
		notify('success', 'Вы успешно вошли!');
	} catch (error) {
		console.log('login error', error);
		// dispatch({
		// 	type: ACTIONS.AUTH_ERROR,
		// 	payload: error.response.data.message,
		// });
	}
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem('token');
	dispatch(loginUserSuccess(null));
};
export const checkAuth = () => async (dispatch) => {
	const token = localStorage.getItem('token');
	const decodedToken = jwt_decode(token);
	const { data } = await axios.get(
		`${baseUrl}user/detail/${decodedToken.user_id}`
	);
	dispatch(loginUserSuccess(data));
};
// export const listenAuth = () => async (dispatch) => {
// 	useEffect(() => {
// 		onAuthStateChanged(auth, (user) => {
// 			if (user) {
// 				dispatch(getUserDocument(user.uid));
// 			} else {
// 				dispatch(loginUserSuccess(user));
// 			}
// 		});
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);
// };
