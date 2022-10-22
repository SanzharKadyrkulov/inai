import React from 'react';
import { Card, Stack, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';
import FormObject from '../Form/FormBook';
import Page from '../components/Page';

const EditBook = () => {
	const {
		book: { book },
	} = useSelector((state) => state);
	const { editBook, getOneBook } = useActions();
	return (
		<Page title='Изменить объект'>
			<Container>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					mb={5}
				>
					<Typography variant='h4' gutterBottom>
						Изменить объект
					</Typography>
				</Stack>
				<Card sx={{ padding: '40px' }}>
					<FormObject
						saveValues={editBook}
						compForEdit={true}
						forEditVal={book}
						getOneProduct={getOneBook}
					/>
				</Card>
			</Container>
		</Page>
	);
};

export default EditBook;
