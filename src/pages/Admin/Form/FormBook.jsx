/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from 'firebase/storage';
import { storage } from '../../../firebase/firebase';
import { useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';
import axios from 'axios';
import { baseUrl } from '../../../helpers/consts';

const initValues = {
	title: '',
	description: '',
	author: '',
	publishment: '',
	quantity: 0,
	lang: '',
	is_active: '',
	category: '',
};

const FormObject = ({ saveValues, compForEdit, forEditVal, getOneProduct }) => {
	// const { companies } = useSelector((state) => state.company);
	// const { getCompanies } = useActions();

	const [categories, setCategories] = useState([]);
	const getCategories = async () => {
		const { data } = await axios.get(`${baseUrl}category/list?format=json`);
		setCategories(data);
	};
	useEffect(() => {
		getCategories();
	}, []);
	const [inpValues, setInpValues] = useState(initValues);
	const [chosenImage, setChooseImage] = useState(null);
	const handleChangeImage = async (e) => {
		// setImgLoad(true);
		// if (chosenImage) deleteObject(ref(storage, `objects/${chosenImage?.name}`));
		setChooseImage(e.target.files ? e.target.files[0] : null);
		// if (!!e.target.files) {
		// 	const imageRef = ref(storage, `objects/${e.target.files[0].name}`);
		// 	await uploadBytes(imageRef, e.target.files[0]);
		// 	const link = await getDownloadURL(imageRef);
		// 	setImageUrl(link);
		// }
		// setImgLoad(false);
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
			setInpValues({ ...forEditVal, category: forEditVal.category.id });
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const category = categories.find((item) => item.id === inpValues.category);
		let obj;
		if (compForEdit) {
			obj = {
				...inpValues,
				// image: [imageUrl],
				category: category.id,
				quantity: +inpValues.quantity,
			};
		} else {
			obj = {
				...inpValues,
				// image: chosenImage,
				category: category.id,
				quantity: +inpValues.quantity,
			};
		}
		await saveValues(obj);
		navigate('/admin');
	};

	return (
		<div>
			<Box
				// style={imgLoad ? { opacity: '0.5' } : {}}
				sx={{
					borderRadius: '5px',
					overflow: 'hidden',
					maxWidth: '270px',
					margin: '0 auto',
				}}
			>
				{/* <img style={{ width: '100%' }} src={imageUrl} alt='' /> */}
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
					name='title'
					value={inpValues.title}
					onChange={(e) => handleChange(e)}
					id='outlined-basic'
					label='Название'
					variant='outlined'
					required
				/>
				<TextField
					sx={{ margin: '5px 0' }}
					name='description'
					value={inpValues.description}
					onChange={(e) => handleChange(e)}
					id='outlined-basic'
					label='Описание'
					variant='outlined'
					required
				/>
				<TextField
					sx={{ margin: '5px 0' }}
					name='author'
					value={inpValues.author}
					onChange={(e) => handleChange(e)}
					id='outlined-basic'
					label='Автор'
					variant='outlined'
					required
				/>
				<TextField
					sx={{ margin: '5px 0' }}
					name='publishment'
					value={inpValues.publishment}
					onChange={(e) => handleChange(e)}
					id='outlined-basic'
					label='Издательство'
					variant='outlined'
					required
				/>
				<TextField
					sx={{ margin: '5px 0' }}
					name='quantity'
					value={inpValues.quantity}
					onChange={(e) => handleChange(e)}
					id='outlined-basic'
					label='Количество'
					variant='outlined'
					type='number'
					required
				/>
				<TextField
					sx={{ margin: '5px 0' }}
					name='lang'
					value={inpValues.lang}
					onChange={(e) => handleChange(e)}
					id='outlined-basic'
					label='Язык'
					variant='outlined'
					required
				/>
				<FormControl sx={{ margin: '5px 0' }} fullWidth>
					<InputLabel id='demo-simple-select-label'>Категория</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						name='category'
						value={inpValues.category}
						label='Компания'
						onChange={(e) => handleChange(e)}
					>
						{categories.length > 0 &&
							categories.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.title}
								</MenuItem>
							))}
					</Select>
				</FormControl>
				<FormControl sx={{ margin: '5px 0' }} fullWidth>
					<InputLabel id='demo-simple-select-label'>В доступе</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						name='is_active'
						value={inpValues.is_active}
						label='В доступе'
						onChange={(e) => handleChange(e)}
					>
						<MenuItem value={true}>{'Да'}</MenuItem>
						<MenuItem value={false}>{'Нет'}</MenuItem>
					</Select>
				</FormControl>
				<input
					style={{ margin: '5px 0 10px 0' }}
					onChange={(e) => handleChangeImage(e)}
					type='file'
					placeholder='Image'
					name='image'
					id='image'
					accept='image/*'
					className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
				/>
				<Button type='submit' variant='contained'>
					Сохранить
				</Button>
			</form>
		</div>
	);
};

export default FormObject;
