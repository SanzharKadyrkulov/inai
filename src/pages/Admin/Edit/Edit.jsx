import React from 'react';
import { Card, Stack, Container, Typography } from '@mui/material';
import Form from '../Form/Form';
import { useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';
import Page from '../components/Page';

const Edit = () => {
	const {
		company: { company },
	} = useSelector((state) => state);
	const { editCompany, getOneCompany } = useActions();
	return (
		<Page title='Изменить компанию'>
			<Container>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					mb={5}
				>
					<Typography variant='h4' gutterBottom>
						Изменить компанию
					</Typography>
				</Stack>
				<Card sx={{ padding: '40px' }}>
					<Form
						saveValues={editCompany}
						compForEdit={true}
						forEditVal={company}
						getOneProduct={getOneCompany}
					/>
				</Card>
			</Container>
		</Page>
	);
};

export default Edit;
