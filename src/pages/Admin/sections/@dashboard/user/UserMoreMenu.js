import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
	Menu,
	MenuItem,
	IconButton,
	ListItemIcon,
	ListItemText,
	Button,
} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import useActions from '../../../../../hooks/useActions';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ item, handleDelete, isCompany }) {
	const ref = useRef(null);
	const [isAdding, setIsAdding] = useState(false);
	const { addImagesToObject } = useActions();
	const [isOpen, setIsOpen] = useState(false);
	const [images, setImages] = useState([]);
	const handleSubmit = (e) => {
		e.preventDefault();
		addImagesToObject(item, images);
		setIsOpen(false);
		setIsAdding(false);
	};
	return (
		<>
			<IconButton ref={ref} onClick={() => setIsOpen(true)}>
				<Iconify icon='eva:more-vertical-fill' width={20} height={20} />
			</IconButton>

			<Menu
				open={isOpen}
				anchorEl={ref.current}
				onClose={() => setIsOpen(false)}
				PaperProps={{
					sx: { width: 280, maxWidth: '100%' },
				}}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				{!isAdding ? (
					<div>
						<MenuItem
							onClick={() => {
								handleDelete(item);
								setIsOpen(false);
							}}
							sx={{ color: 'text.secondary' }}
						>
							<ListItemIcon>
								<Iconify icon='eva:trash-2-outline' width={24} height={24} />
							</ListItemIcon>
							<ListItemText
								primary='Удалить'
								primaryTypographyProps={{ variant: 'body2' }}
							/>
						</MenuItem>

						<MenuItem
							component={RouterLink}
							to={
								isCompany ? `/editCompany/${item.id}` : `/editBook/${item.id}`
							}
							sx={{ color: 'text.secondary' }}
						>
							<ListItemIcon>
								<Iconify icon='eva:edit-fill' width={24} height={24} />
							</ListItemIcon>
							<ListItemText
								primary='Изменить'
								primaryTypographyProps={{ variant: 'body2' }}
							/>
						</MenuItem>
						{/* {!isCompany && (
							<MenuItem
								onClick={() => setIsAdding(true)}
								sx={{ color: 'text.secondary' }}
							>
								<ListItemIcon>
									<Iconify
										icon='ic:baseline-add-photo-alternate'
										width={24}
										height={24}
									/>
								</ListItemIcon>
								<ListItemText
									primary='Добавить фото'
									primaryTypographyProps={{ variant: 'body2' }}
								/>
							</MenuItem>
						)} */}
					</div>
				) : (
					<MenuItem sx={{ color: 'text.secondary' }}>
						<form
							onSubmit={(e) => handleSubmit(e)}
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<input
								accept='image/*'
								onChange={(e) => setImages(e.target.files)}
								multiple
								type='file'
							/>
							<Button
								sx={{ marginTop: '4px' }}
								size='small'
								type='submit'
								variant='contained'
							>
								Сохранить
							</Button>
						</form>
					</MenuItem>
				)}
			</Menu>
		</>
	);
}
