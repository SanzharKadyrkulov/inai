import { Button, Rating } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import CommentForm from '../Comments/CommentForm';
import CommentList from '../Comments/CommentList';
import { notify } from '../Toastify/Toastify';

const BookDetails = () => {
	const [wantToComment, setWantToComment] = useState(false);
	const [currImg, setCurrImg] = useState();
	const [adminRating, setAdminRating] = useState(0);

	const {
		book: { book, myBooks, myOrders },
		comment: { comments },
		user: { userInfo },
		constants: { maxDays, maxBooks },
	} = useSelector((state) => state);
	const { id } = useParams();
	const { getOneBook, makeOrder, addComment, getMyBooks, getMyOrders } =
		useActions();
	useEffect(() => {
		getOneBook(id);
		// getFilteredComments(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (book) {
			// setAdminRating(book.admin_rating);
			setCurrImg(book.image);
		}
	}, [book]);

	useEffect(() => {
		if (userInfo) {
			getMyBooks(userInfo.id);
			getMyOrders(userInfo.id);
		} else {
			notify('error', 'Вы не авторизованы');
		}
	}, [userInfo]);
	// console.log(book, 'book');

	return (
		<>
			{book ? (
				<Box>
					<Box
						sx={{
							display: 'flex',
							borderRadius: '8px',
							padding: '8px',
							backgroundColor: 'white',
							flexDirection: { xs: 'column', sm: 'row' },
						}}
					>
						<Box
							sx={{
								width: { xs: '100%', sm: '50%' },
								borderRadius: '8px',
								maxHeight: '420px',
								overflow: 'hidden',
							}}
						>
							<img width='100%' src={currImg} alt={book.name} />
						</Box>
						<Box
							sx={{
								display: { xs: 'grid', sm: 'flex' },
								gridTemplateColumns: '1fr 1fr',
								gridGap: '24px',
								flexDirection: { xs: 'row', sm: 'column' },
								width: { xs: '100%', sm: '50%' },
								padding: { xs: '20px 0', sm: '20px' },
								justifyContent: 'space-between',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									justifyContent: { xs: 'flex-start', sm: 'space-between' },
									flexDirection: { xs: 'column', sm: 'row' },
								}}
							>
								<Box
									sx={{
										textAlign: 'left',
										width: '50%',
										fontSize: { xs: '14px', sm: '20px' },
										fontWeight: { xs: 600, sm: 500 },
										marginBottom: '4px',
									}}
								>
									Издательство
								</Box>
								<Box
									sx={{
										textAlign: 'left',
										width: '50%',
										fontSize: { xs: '12px', sm: '18px' },
										fontWeight: 700,
										color: '#c7c7c7',
									}}
								>
									{book.publishment}
								</Box>
							</Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: { xs: 'flex-start', sm: 'space-between' },
									flexDirection: { xs: 'column', sm: 'row' },
								}}
							>
								<Box
									sx={{
										textAlign: 'left',
										width: '50%',
										fontSize: { xs: '14px', sm: '20px' },
										fontWeight: { xs: 600, sm: 500 },
										marginBottom: '4px',
									}}
								>
									Название
								</Box>
								<Box
									sx={{
										textAlign: 'left',
										width: '50%',
										fontSize: { xs: '12px', sm: '18px' },
										fontWeight: 700,
										color: '#c7c7c7',
									}}
								>
									{book.title}
								</Box>
							</Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: { xs: 'flex-start', sm: 'space-between' },
									flexDirection: { xs: 'column', sm: 'row' },
								}}
							>
								<Box
									sx={{
										textAlign: 'left',
										width: '50%',
										fontSize: { xs: '14px', sm: '20px' },
										fontWeight: { xs: 600, sm: 500 },
										marginBottom: '4px',
									}}
								>
									Язык
								</Box>
								<Box
									sx={{
										textAlign: 'left',
										width: '50%',
										fontSize: { xs: '12px', sm: '18px' },
										fontWeight: 700,
										color: '#c7c7c7',
									}}
								>
									{book.lang}
								</Box>
							</Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: { xs: 'flex-start', sm: 'space-between' },
									flexDirection: { xs: 'column', sm: 'row' },
								}}
							>
								<Box
									sx={{
										textAlign: 'left',
										width: '50%',
										fontSize: { xs: '14px', sm: '20px' },
										fontWeight: { xs: 600, sm: 500 },
										marginBottom: '4px',
									}}
								>
									Рейтинг
								</Box>
								<Box
									sx={{
										textAlign: 'left',
										display: 'flex',
										alignItems: 'center',
										width: '50%',
										fontSize: { xs: '12px', sm: '18px' },
										fontWeight: 700,
										color: '#c7c7c7',
									}}
								>
									{/* {book.rating.toFixed(1)} */}
									{5}
									<Rating
										size='small'
										color='#ff9000'
										name='simple-controlled'
										value={book.rating}
										precision={0.1}
										readOnly
									/>
								</Box>
							</Box>
						</Box>
					</Box>
					<Button
						sx={{
							textTransform: 'uppercase',
							padding: '16px 32px',
							backgroundColor: '#ff9000',
							borderRadius: '16px',
							margin: '24px 0',
							fontWeight: 600,
							color: 'white',
							'&:hover': {
								backgroundColor: '#ff8000',
							},
						}}
						color='warning'
						onClick={() =>
							myBooks.length + myOrders.length > maxBooks
								? notify('error', 'Максимальное количество броней')
								: makeOrder({ book: book.id, user: userInfo.id, days: maxDays })
						}
						variant='contained'
					>
						Забронировать
					</Button>
					{/* {userInfo && userInfo.role === 'admin' ? (
						<>
							<Rating
								color='warning'
								name='simple-controlled'
								value={adminRating}
								size='large'
								onChange={(e, v) => setAdminRating(v)}
							/>
							<br />
							<Button
								color='warning'
								onClick={() => editBook({ ...book, admin_rating: adminRating })}
							>
								Оценить
							</Button>
						</>
					) : null} */}
					{!wantToComment ? (
						<>
							<Button
								sx={{
									textTransform: 'uppercase',
									padding: '16px 32px',
									backgroundColor: '#ff9000',
									borderRadius: '16px',
									margin: '24px 0',
									fontWeight: 600,
									color: 'white',
									'&:hover': {
										backgroundColor: '#ff8000',
									},
								}}
								color='warning'
								onClick={() => setWantToComment(true)}
								variant='contained'
							>
								Оставить отзыв
							</Button>
							<CommentList item={book} comments={comments} />
						</>
					) : (
						<Box>
							<CommentForm
								user={userInfo}
								item={book}
								saveValues={addComment}
								onClose={setWantToComment}
							/>
						</Box>
					)}
				</Box>
			) : (
				<h2>Loading...</h2>
			)}
		</>
	);
};

export default BookDetails;
{
	/* <Box
								sx={{
									display: 'flex',
									borderRadius: '8px',
									padding: '8px',
									backgroundColor: 'white	',
									marginTop: '16px',
									overflow: 'auto',
									whiteSpace: 'nowrap',
								}}
							>
								{book.image.map((img) => (
									<Box
										key={img}
										className='hover-scale'
										onClick={() => currImg !== img && setCurrImg(img)}
										sx={{
											maxWidth: '126px',
											minWidth: '126px',
											borderRadius: '8px',
											overflow: 'hidden',
											transition: '0.4s ease',
											marginRight: '8px',
										}}
									>
										<img width='100%' src={img} alt='' />
									</Box>
								))}
							</Box> */
}
