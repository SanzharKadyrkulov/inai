/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from 'firebase/storage';
import { storage } from '../../../firebase/firebase';

const initValues = {
	name: '',
	image: '',
};

const Form = ({ saveValues, compForEdit, forEditVal, getOneProduct }) => {
	const [inpValues, setInpValues] = useState(initValues);
	const [chosenImage, setChooseImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(inpValues.image);
	const [imgLoad, setImgLoad] = useState(false);

	const handleChangeImage = async (e) => {
		setImgLoad(true);
		if (chosenImage)
			deleteObject(ref(storage, `companies/${chosenImage?.name}`));
		setChooseImage(e.target.files ? e.target.files[0] : null);
		if (!!e.target.files) {
			const imageRef = ref(storage, `companies/${e.target.files[0].name}`);
			await uploadBytes(imageRef, e.target.files[0]);
			const link = await getDownloadURL(imageRef);
			await setImageUrl(link);
		}
		setImgLoad(false);
	};

	const { id } = useParams();
	const navigate = useNavigate();
	//todo ===> EDIT
	useEffect(() => {
		if (compForEdit) {
			getOneProduct(id);
		}
	}, []);
	useEffect(() => {
		if (compForEdit && forEditVal) {
			setInpValues(forEditVal);
			setImageUrl(forEditVal.image[0]);
		}
	}, [forEditVal]);

	//todo ===> END OF EDIT

	const handleChange = (e) => {
		let obj = {
			...inpValues,
			[e.target.name]: e.target.value,
		};
		setInpValues(obj);
	};
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	let obj = {
	// 		...inpValues,
	// 		price: +inpValues.price,
	// 	};
	// 	saveValues(obj);
	// };
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (imgLoad) return;
		let obj;
		if (compForEdit) {
			if (imageUrl !== forEditVal.image[0])
				deleteObject(ref(storage, `${forEditVal.image[0]}`));
			obj = {
				name: inpValues.name,
				image: [imageUrl],
				id: inpValues.id,
			};
		} else {
			obj = {
				...inpValues,
				image: [imageUrl],
				comments: 0,
				houses: 0,
				rating: 0,
			};
		}
		await saveValues(obj);
		navigate('/admin');
	};

	return (
		<div>
			<Box
				style={imgLoad ? { opacity: '0.5' } : {}}
				sx={{
					borderRadius: '5px',
					overflow: 'hidden',
					maxWidth: '270px',
					margin: '0 auto',
				}}
			>
				<img style={{ width: '100%' }} src={imageUrl} alt='' />
			</Box>
			<form
				onSubmit={(e) => handleSubmit(e)}
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<TextField
					sx={{ margin: '10px 0 5px 0' }}
					name='name'
					value={inpValues.name}
					onChange={(e) => handleChange(e)}
					id='outlined-basic'
					label='Название'
					variant='outlined'
					required
				/>

				<input
					style={{ margin: '5px 0 10px 0' }}
					onChange={(e) => handleChangeImage(e)}
					type='file'
					accept='image/*'
					name='image'
					id='image'
					className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
				/>
				<Button disabled={imgLoad} type='submit' variant='contained'>
					Сохранить
				</Button>
			</form>
		</div>
	);
};

export default Form;
