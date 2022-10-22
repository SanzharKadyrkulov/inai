import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { Outlet, useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	backgroundColor: '#424242',
	'&:hover': {
		backgroundColor: '#424242',
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	// [theme.breakpoints.up('sm')]: {
	// 	marginLeft: theme.spacing(3),
	// 	width: 'auto',
	// },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'white',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		// [theme.breakpoints.up('md')]: {
		// 	width: '20ch',
		// },
	},
}));

const AdminLayout = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Box
				sx={{
					width: '100%',
					height: '50px',
					display: 'flex',
					backgroundColor: '#212121',
				}}
			>
				<Typography
					variant='h6'
					noWrap
					component='div'
					onClick={() => navigate('/')}
					sx={{
						// display: { xs: 'none', sm: 'block' },
						backgroundColor: '#212121',
						minWidth: '100px',
						color: 'white',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: 'pointer',
					}}
				>
					MUI
				</Typography>
				<Box sx={{ padding: '5px 0', width: '100%' }}>
					<Search>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
				</Box>
			</Box>
			<Box sx={{ display: 'flex' }}>
				<Box
					sx={{
						maxWidth: '300px',
						width: '100%',
						padding: '0 25px',
						height: '100vh',
						backgroundColor: 'rgba(204, 204, 204, 0.3)',
					}}
				>
					<Box
						sx={{
							textAlign: 'left',
							margin: '8px 0',
							cursor: 'pointer',
							fontSize: '20px',
							fontWeight: 700,
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<span onClick={() => navigate('/admin')}>Companies</span>
						<span onClick={() => navigate('/addCompany')}>add</span>
					</Box>
					<Box
						sx={{
							textAlign: 'left',
							margin: '8px 0',
							cursor: 'pointer',
							fontSize: '20px',
							fontWeight: 700,
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<span onClick={() => navigate('/adminObjects')}>Objects</span>
						<span onClick={() => navigate('/addObject')}>add</span>
					</Box>
				</Box>
				<Outlet />
			</Box>
		</div>
	);
};

export default AdminLayout;
