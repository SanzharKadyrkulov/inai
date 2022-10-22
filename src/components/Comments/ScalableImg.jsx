import { Box } from '@mui/material';
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	boxShadow: 24,
};
const ScalableImg = ({ img }) => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<Box
				sx={{
					maxWidth: '126px',
					minWidth: '126px',
					borderRadius: '8px',
					overflow: 'hidden',
					transition: '0.4s ease',
					marginRight: '8px',
				}}
				className='hover-scale'
				onClick={handleOpen}
			>
				<img width='100%' src={img} alt='' />
			</Box>

			<Modal
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<img width='100%' src={img} alt='' />
					</Box>
				</Fade>
			</Modal>
		</>
	);
};

export default ScalableImg;

// {
// 	/* <IconButton
// 				sx={{
// 					position: 'fixed',
// 					right: '-20%',
// 					top: '10%',
// 					transform: 'translate(-50%, -50%)',
// 					display: isActive ? 'block' : 'none',
// 				}}
// 				id='close-btn'
// 			>
// 				<svg
// 					xmlns='http://www.w3.org/2000/svg'
// 					fill='none'
// 					viewBox='0 0 24 24'
// 					stroke='currentColor'
// 					strokeWidth={2}
// 					width={22}
// 					height={22}
// 				>
// 					<path
// 						strokeLinecap='round'
// 						strokeLinejoin='round'
// 						d='M6 18L18 6M6 6l12 12'
// 					/>
// 				</svg>
// 			</IconButton> */
// }
