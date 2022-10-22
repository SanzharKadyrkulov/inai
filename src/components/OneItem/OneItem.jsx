import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Grid, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
export default function OneItem({ item, link, isExpired }) {
	// const { addDelToCart, isProdInCart } = useCart();
	// const [inCart, setInCart] = useState(isProdInCart(item.id));
	const navigate = useNavigate();
	const location = useLocation();
	// console.log(item, 'item');
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card
				className='shadow'
				onClick={() => navigate(link)}
				sx={{
					maxWidth: 280,
					borderRadius: '8px',
					margin: '0 auto',
					position: 'relative',
				}}
			>
				{item.admin_rating && (
					<Box
						sx={{
							backgroundColor: '#ff9000',
							borderRadius: '800px',
							position: 'absolute',
							right: '6px',
							top: '6px',
							zIndex: '1',
							color: '#fff',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '14px',
							padding: '4px 8px',
						}}
					>
						{item.admin_rating}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='white'
							strokeWidth={2}
							width={16}
							height={16}
							style={{ marginLeft: '4px' }}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
							/>
						</svg>
					</Box>
				)}
				<CardMedia
					component='img'
					height='240'
					image={
						location.pathname === '/myorders' ||
						location.pathname === '/mybooks'
							? `http://10.42.0.237:8000${item.image}` ||
							  'https://img3.labirint.ru/rc/4186d71d282c1689db826497f6a9c6c0/363x561q80/books86/854927/cover.png?1661336708'
							: item.image ||
							  'https://img3.labirint.ru/rc/4186d71d282c1689db826497f6a9c6c0/363x561q80/books86/854927/cover.png?1661336708'
					}
					alt={item.title}
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant='h5'
						component='div'
						sx={
							location.pathname === '/mybooks'
								? {
										fontWeight: 700,
										fontSize: '12px',
										color: isExpired ? 'red' : 'green',
								  }
								: {
										fontWeight: 700,
										fontSize: '12px',
								  }
						}
					>
						{item.title}
					</Typography>
					{/* <Typography variant='h6' color='green'>
						${item.price}
					</Typography> */}
					<Typography
						color='#ff9000'
						variant='body1'
						sx={{ fontWeight: 700, fontSize: '12px' }}
					>
						{/* Общий рейтинг {item.rating.toFixed(1)} */}
						Общий рейтинг {5}
					</Typography>
					{/* <Typography variant='body2' color='text.secondary'>
						{item.description}
					</Typography> */}
				</CardContent>

				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'space-evenly',
						paddingBottom: '24px',
					}}
				>
					<IconButton
						color={'info'}
						sx={{ backgroundColor: '#f8f9fa', borderRadius: '800px' }}
					>
						<Box
							sx={{
								borderRadius: '100%',
								backgroundColor: '#ff9000',
								width: '26px',
								height: '26px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								width={22}
								height={22}
								stroke='white'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
								/>
							</svg>
						</Box>
						<Typography
							sx={{ marginLeft: '15px', color: '#ff9000', fontWeight: 700 }}
							variant='body1'
						>
							{item.quantity}
						</Typography>
					</IconButton>
					<IconButton
						color={'info'}
						sx={{ backgroundColor: '#f8f9fa', borderRadius: '800px' }}
					>
						<Box
							sx={{
								borderRadius: '100%',
								backgroundColor: '#ff9000',
								width: '26px',
								height: '26px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								width={22}
								height={22}
								stroke='white'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
								/>
							</svg>
						</Box>
						<Typography
							sx={{ marginLeft: '15px', color: '#ff9000', fontWeight: 700 }}
							variant='body1'
						>
							{item.rest_q}
						</Typography>
					</IconButton>
					{/* <Button size='small'>Learn More</Button> */}
				</CardActions>
			</Card>
		</Grid>
	);
}
