import { Container } from '@mui/material';
import React from 'react';
import CompanyList from '../../components/Company/CompanyList';

const HomePage = () => {
	return (
		<Container maxWidth='lg'>
			<CompanyList />
		</Container>
	);
};

export default HomePage;
