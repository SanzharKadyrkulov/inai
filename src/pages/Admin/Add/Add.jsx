import React from 'react';
import { Card, Stack, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import Form from '../Form/Form';
import useActions from '../../../hooks/useActions';

const Add = () => {
	const { addCompany } = useActions();
	return (
		<Page title='Добавить компанию'>
			<Container>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					mb={5}
				>
					<Typography variant='h4' gutterBottom>
						Добавить компанию
					</Typography>
				</Stack>
				<Card sx={{ padding: '40px' }}>
					<Form saveValues={addCompany} compForEdit={false} />
				</Card>
			</Container>
		</Page>
	);
};

export default Add;
