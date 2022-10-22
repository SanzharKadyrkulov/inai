import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
	return (
		<Box>
			<Header />
			<Box
				sx={{
					display: 'flex',
					backgroundColor: 'rgb(248, 249, 250)',
					padding: '48px 0',
				}}
			>
				<Container maxWidth='md'>
					<Outlet />
				</Container>
			</Box>
			<Footer />
		</Box>
	);
};

export default MainLayout;
