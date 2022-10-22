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
const ScalableVideo = ({ vid }) => {
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
				<video width='100%' src={vid} />
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
						<video
							width='100%'
							src={vid}
							controls
							controlsList='nodownload'
						></video>
					</Box>
				</Fade>
			</Modal>
		</>
	);
};

export default ScalableVideo;
