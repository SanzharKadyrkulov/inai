import React from 'react';
import { Card, Stack, Container, Typography } from '@mui/material';
import useActions from '../../../hooks/useActions';
import Page from '../components/Page';
import FormBook from '../Form/FormBook';

const AddObject = () => {
	const { addBook } = useActions();
	return (
		<Page title='Добавить книгу'>
			<Container>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					mb={5}
				>
					<Typography variant='h4' gutterBottom>
						Добавить книгу
					</Typography>
				</Stack>
				<Card sx={{ padding: '40px' }}>
					<FormBook saveValues={addBook} compForEdit={false} />
				</Card>
			</Container>
		</Page>
	);
};

export default AddObject;
