// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCU_R3_ossh_hucXPGT_90ZvIOoWsfGJds',
	authDomain: 'prod-osk.firebaseapp.com',
	projectId: 'prod-osk',
	storageBucket: 'prod-osk.appspot.com',
	messagingSenderId: '384404416484',
	appId: '1:384404416484:web:6ae3427560bef7b6a489f1',
	measurementId: 'G-FEX4RLN4DB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
