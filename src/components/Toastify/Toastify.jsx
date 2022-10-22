import React from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (type, message) => {
	toast(message, {
		position: 'top-center',
		autoClose: 2500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		type,
		transition: Slide,
	});
};

const Toastify = () => {
	return (
		<ToastContainer
			position='top-center'
			autoClose={2500}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			transition={Slide}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	);
};

export default Toastify;
