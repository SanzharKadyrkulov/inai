import styled from '@emotion/styled';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import VideocamIcon from '@mui/icons-material/Videocam';
import {
	Button,
	InputLabel,
	Rating,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { checkFill } from '../../helpers/functions';
import useActions from '../../hooks/useActions';

const Input = styled('input')({
	display: 'none',
});

const StyledTextField = styled(TextField)({
	'& textarea + textarea + fieldset': {
		borderColor: '#ff9000',
		borderWidth: 2,
	},
	'& textarea:hover + textarea + fieldset': {
		borderColor: '#ff9000',
		borderWidth: 2,
	},
	'& input + fieldset': {
		borderColor: '#ff9000',
		borderWidth: 2,
	},
	'& input:valid:focus + fieldset': {
		borderLeftWidth: 6,
		padding: '4px !important', // override inline-style
	},
});

const CommentForm = ({
	item,
	onClose,
	user,
	saveValues,
	compForEdit,
	forEditVal,
}) => {
	const [images, setImages] = useState(null);
	const [videos, setVideos] = useState(null);
	const [values, setValues] = useState({
		title: '',
		text: '',
		cons: '',
		pros: '',
		rating: 0,
	});
	const { companies } = useSelector((state) => state.company);
	const { getCompanies } = useActions();
	useEffect(() => {
		getCompanies();
		if (compForEdit && forEditVal) {
			setValues(forEditVal);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (e) => {
		const newObj = {
			...values,
			[e.target.name]: e.target.value,
		};
		setValues(newObj);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!checkFill(values)) return;
		const company = companies.find((i) => i.id === item.companyId);
		let newComment;
		if (!compForEdit) {
			newComment = {
				...values,
				image: [],
				video: [],
				objectId: item.id,
				author_id: user.id,
				author: `${user.firstName} ${user.lastName}`,
				date: Date.now(),
			};
		} else {
			newComment = {
				...values,
				date: Date.now(),
			};
		}
		saveValues(newComment, item, forEditVal, company, images, videos);
		onClose(false);
	};
	return (
		<div>
			<Typography
				sx={{ color: '#ff9000', textAlign: 'left', cursor: 'pointer' }}
				onClick={() => onClose(false)}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth={2}
					width={30}
					height={30}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M7 16l-4-4m0 0l4-4m-4 4h18'
					/>
				</svg>
			</Typography>
			<form noValidate onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
				<InputLabel
					sx={{
						textAlign: 'left',
						color: '#000',
						margin: '24px 0 16px',
						fontSize: '18px',
					}}
				>
					Ваше общее впечатление в двух словах:
				</InputLabel>
				<StyledTextField
					fullWidth
					name='title'
					required
					variant='outlined'
					color='warning'
					value={values.title}
					onChange={(e) => handleChange(e)}
				/>
				<InputLabel
					sx={{
						textAlign: 'left',
						color: '#000',
						margin: '24px 0 16px',
						fontSize: '18px',
					}}
				>
					Текст отзыва:
				</InputLabel>
				<StyledTextField
					fullWidth
					multiline
					rows={4}
					required
					name='text'
					variant='outlined'
					color='warning'
					value={values.text}
					onChange={(e) => handleChange(e)}
				/>
				<InputLabel
					sx={{
						textAlign: 'left',
						color: '#000',
						margin: '24px 0 16px',
						fontSize: '18px',
					}}
				>
					Плюсы:
				</InputLabel>
				<StyledTextField
					name='cons'
					fullWidth
					variant='outlined'
					color='warning'
					required
					value={values.cons}
					onChange={(e) => handleChange(e)}
				/>
				<InputLabel
					sx={{
						textAlign: 'left',
						color: '#000',
						margin: '24px 0 16px',
						fontSize: '18px',
					}}
				>
					Минусы:
				</InputLabel>
				<StyledTextField
					name='pros'
					fullWidth
					variant='outlined'
					required
					color='warning'
					value={values.pros}
					onChange={(e) => handleChange(e)}
				/>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'left',
						color: '#000',
						margin: '24px 0 16px',
						fontSize: '18px',
					}}
				>
					Оценить:
					<Rating
						sx={{ marginLeft: '5px' }}
						color='warning'
						name='simple-controlled'
						value={values.rating}
						size='large'
						onChange={(e, v) => setValues((prev) => ({ ...prev, rating: v }))}
					/>
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'left',
						color: '#000',
						margin: '24px 0 16px',
						fontSize: '18px',
					}}
				>
					<label htmlFor='contained-button-photo'>
						<Input
							accept='image/*'
							onChange={(e) => setImages(e.target.files)}
							id='contained-button-photo'
							multiple
							type='file'
						/>
						<Button
							variant='outlined'
							color='warning'
							sx={{
								textTransform: 'uppercase',
								padding: '8px 24px',
								borderRadius: '4px',
								color: '#ff9000',
							}}
							component='span'
						>
							Загрузить фото докозательства
							<PhotoCamera sx={{ marginLeft: '8px' }} />
						</Button>
					</label>
					{images && (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='#ff9000'
							strokeWidth={3}
							width={28}
							height={28}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M5 13l4 4L19 7'
							/>
						</svg>
					)}
				</Box>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'left',
						color: '#000',
						margin: '24px 0 16px',
						fontSize: '18px',
					}}
				>
					<label htmlFor='contained-button-video'>
						<Input
							accept='video/*'
							onChange={(e) => setVideos(e.target.files)}
							id='contained-button-video'
							multiple
							type='file'
						/>
						<Button
							variant='outlined'
							color='warning'
							sx={{
								textTransform: 'uppercase',
								padding: '8px 24px',
								borderRadius: '4px',
								color: '#ff9000',
							}}
							component='span'
						>
							Загрузить видео докозательства
							<VideocamIcon sx={{ marginLeft: '8px' }} />
						</Button>
					</label>
					{videos && (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='#ff9000'
							strokeWidth={3}
							width={28}
							height={28}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M5 13l4 4L19 7'
							/>
						</svg>
					)}
				</Box>
				<Button
					sx={{
						textTransform: 'uppercase',
						padding: '8px 32px',
						backgroundColor: '#ff9000',
						borderRadius: '8px',
						margin: '24px 0',
						'&:hover': {
							backgroundColor: '#ff8000',
						},
					}}
					type='submit'
					variant='contained'
				>
					Отправить
				</Button>
			</form>
		</div>
	);
};

export default CommentForm;
