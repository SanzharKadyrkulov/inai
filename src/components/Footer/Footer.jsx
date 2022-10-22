import { Box, Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import { ReactComponent as Logo } from '../../assets/logo_orange.svg';
const Footer = () => {
	return (
		<>
			<div className='footer'>
				<div className='container'>
					<div className='nav'>
						{/* <img src={Logo} alt='logo' /> */}
						<Logo />
						<Box
							sx={{
								display: 'flex',
							}}
						>
							{/* <Button
								sx={{
									my: 2,
									display: 'block',
									fontSize: '12px',
									color: '#000',
									textTransform: 'capitalize',
								}}
								component={NavLink}
								to='/'
							>
								Застройщики
							</Button> */}
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
						</Box>
						<div style={{ width: '44px', height: '44px' }}></div>
					</div>
					<div>
						<p>
							developed by{' '}
							<a href='https://www.linkedin.com/in/sanzhar-kadyrkulov'>
								sanzharidze
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
