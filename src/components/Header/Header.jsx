/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import { ReactComponent as Logo } from '../../assets/logo_white.svg';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: '6px 12px',
		// vertical padding + font size from searchIcon
		// paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		fontSize: '12px',
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '30ch',
		},
	},
}));

export default function Header(props) {
	const {
		user: { userInfo },
		search: { searchItems },
	} = useSelector((store) => store);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [items, setItems] = React.useState([]);
	const [searchVal, setSearchVal] = React.useState('');
	const navigate = useNavigate();
	const { logout, getSearch } = useActions();

	React.useEffect(() => {
		getSearch();
	}, []);
	React.useEffect(() => {
		if (!searchVal) {
			setItems([]);
			return;
		}
		const newArr = searchItems.filter((item) =>
			item.name.toLowerCase().includes(searchVal)
		);
		setItems(newArr);
	}, [searchVal]);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	// const handleProfileMenuOpen = (event) => {
	// 	setAnchorEl(event.currentTarget);
	// };

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem
				onClick={() => {
					logout();
					handleMenuClose();
				}}
			>
				Выйти
			</MenuItem>
			{/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			sx={{ marginTop: { xs: '6px', sm: '4px' } }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem
				onClick={handleMobileMenuClose}
				sx={{
					my: 2,
					display: 'block',
					fontSize: '12px',
					color: '#000',
					textTransform: 'capitalize',
					textAlign: 'center',
				}}
				component={NavLink}
				to='/mybooks'
			>
				Мои Книги
			</MenuItem>
			<MenuItem
				onClick={handleMobileMenuClose}
				sx={{
					my: 2,
					display: 'block',
					fontSize: '12px',
					color: '#000',
					textTransform: 'capitalize',
					textAlign: 'center',
				}}
				component={NavLink}
				to='/myorders'
			>
				Мои Брони
			</MenuItem>
			<MenuItem
				onClick={handleMobileMenuClose}
				sx={{
					my: 2,
					display: 'block',
					fontSize: '12px',
					color: '#000',
					textTransform: 'capitalize',
					textAlign: 'center',
				}}
				component={NavLink}
				to='/books'
			>
				Каталог
			</MenuItem>

			{userInfo?.role === 'admin' && (
				<MenuItem
					onClick={handleMobileMenuClose}
					sx={{
						my: 2,
						display: 'block',
						textAlign: 'center',
						fontSize: '12px',
						color: '#000',
					}}
					component={NavLink}
					to='/admin'
				>
					ADMIN
				</MenuItem>
			)}
			<MenuItem onClick={handleMobileMenuClose}>
				{userInfo && userInfo.username ? (
					<Button
						variant='outlined'
						color='warning'
						sx={{
							color: '#ff9000',
							fontSize: '12px',
							borderRadius: '8px',
							textTransform: 'capitalize',
							margin: '0 auto',
						}}
						onClick={() => logout()}
					>
						Выход
					</Button>
				) : (
					<Button
						variant='outlined'
						color='warning'
						sx={{
							color: '#ff9000',
							fontSize: '12px',
							borderRadius: '8px',
							textTransform: 'capitalize',
							margin: '0 auto',
						}}
						onClick={() => navigate('/signin')}
					>
						Вход
					</Button>
				)}
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='sticky'
				className='shadow'
				sx={{
					top: 0,
					backgroundColor: '#ffffff',
					color: '#000',
					maxHeight: '60px',
					width: '100%',
				}}
			>
				<Toolbar
					sx={{
						// minWidth: '855px',
						width: '100%',
						maxWidth: '1020px',
						margin: '0 auto',
						justifyContent: 'space-between',
						padding: { xs: 0 },
					}}
				>
					{/* <IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='open drawer'
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton> */}
					<Box
						onClick={() => navigate('/')}
						className='shadow'
						sx={{
							// display: { xs: 'none', sm: 'block' },
							cursor: 'pointer',
							backgroundColor: '#ff9000',
							padding: '8px',
						}}
					>
						{/* <img src={Logo} alt='logo'/> */}
						<Logo />
					</Box>

					{/* links */}
					<Box sx={{ flexGrow: 1 }} />

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
						}}
					>
						<Button
							sx={{
								my: 2,
								display: 'block',
								fontSize: '12px',
								color: '#000',
								textTransform: 'capitalize',
							}}
							component={NavLink}
							to='/mybooks'
						>
							Мои книги
						</Button>
						<Button
							sx={{
								my: 2,
								display: 'block',
								fontSize: '12px',
								color: '#000',
								textTransform: 'capitalize',
							}}
							component={NavLink}
							to='/myorders'
						>
							Мои брони
						</Button>
						<Button
							sx={{
								my: 2,
								display: 'block',
								fontSize: '12px',
								color: '#000',
								textTransform: 'capitalize',
							}}
							component={NavLink}
							to='/books'
						>
							Каталог
						</Button>

						{userInfo?.role === 'admin' && (
							<Button
								sx={{
									my: 2,
									display: 'block',
									fontSize: '12px',
									color: '#000',
								}}
								component={NavLink}
								to='/admin'
							>
								ADMIN
							</Button>
						)}
					</Box>
					{/* links end */}
					<Box sx={{ position: 'relative' }}>
						<Search
							sx={{
								color: '#212529',
								borderRadius: '34px',
								border: '1px solid #ccc',
							}}
						>
							<StyledInputBase
								placeholder='Search…'
								inputProps={{ 'aria-label': 'search' }}
								onChange={(e) => setSearchVal(e.target.value)}
								value={searchVal}
							/>
						</Search>
						{items.length > 0 && (
							<Box
								sx={{
									position: 'absolute',
									left: 0,
									right: 0,
									borderRadius: '3px',
									border: '0.5px solid #c7c7c7',
								}}
							>
								{items.map((item) => (
									<Box
										key={item.id}
										onClick={() => {
											item.type === 'company'
												? navigate(`/books/${item.itemId}`)
												: navigate(`/details/${item.itemId}`);
											setSearchVal('');
										}}
										className='search-hover'
										sx={{
											backgroundColor: 'white',
											borderBottom: '0.5px solid #c7c7c7',
											cursor: 'pointer',
											textAlign: 'left',
											padding: '8px 16px',
										}}
									>
										<Typography sx={{ color: '#212529' }}>
											{item.name}
										</Typography>
										<Typography sx={{ color: '#6c757d', fontSize: '14px' }}>
											{item.type}
										</Typography>
									</Box>
								))}
							</Box>
						)}
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{userInfo && userInfo.username ? (
							<Button
								variant='outlined'
								color='warning'
								sx={{
									display: { xs: 'none', sm: 'block' },
									color: '#ff9000',
									fontSize: '12px',
									borderRadius: '8px',
									textTransform: 'capitalize',
								}}
								onClick={() => logout()}
							>
								Выход
							</Button>
						) : (
							<Button
								variant='outlined'
								color='warning'
								sx={{
									display: { xs: 'none', sm: 'block' },
									color: '#ff9000',
									fontSize: '12px',
									borderRadius: '8px',
									textTransform: 'capitalize',
								}}
								onClick={() => navigate('/signin')}
							>
								Вход
							</Button>
						)}

						{/* <IconButton
							size='large'
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'
						>
							<AccountCircle />
						</IconButton> */}
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}
