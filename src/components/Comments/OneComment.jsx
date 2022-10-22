import React, { useEffect, useState } from 'react';
import { Box, Button, Rating } from '@mui/material';

import useActions from '../../hooks/useActions';
import CommentForm from './CommentForm';
import { useSelector } from 'react-redux';
import { convertDateTime } from '../../helpers/functions';
import ScalableImg from './ScalableImg';
import ScalableVideo from './ScalableVideo';

const OneComment = ({ comment, item }) => {
	const {
		user: { userInfo },
		company: { companies },
	} = useSelector((state) => state);
	const [readAll, setReadAll] = useState(false);
	const [edit, setEdit] = useState(false);
	const { editComment, deleteComment, getCompanies } = useActions();
	useEffect(() => {
		getCompanies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div>
			{!edit ? (
				<Box
					className='shadow'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						borderRadius: '8px',
						overflow: 'hidden',
						marginBottom: '48px',
						transition: '5s',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							borderBottom: '2px #ff9000 solid',
							padding: '8px 16px',
							backgroundColor: 'rgb(248, 249, 250)',
						}}
					>
						<Box
							sx={{
								width: '50%',
								display: 'flex',
								justifyContent: 'space-between',
								flexDirection: { xs: 'column', sm: 'row' },
								alignItems: 'flex-start',
							}}
						>
							{comment.author}
							<Box
								sx={{
									textAlign: 'left',
									display: 'flex',
									alignItems: 'center',
									fontSize: { xs: '14px', sm: '18px' },
									fontWeight: 700,
									color: '#c7c7c7',
								}}
							>
								{comment.rating}
								<Rating
									sx={{ marginLeft: '8px' }}
									size='small'
									color='#ff9000'
									name='simple-controlled'
									value={comment.rating}
									precision={0.1}
									readOnly
								/>
							</Box>
						</Box>
						<Box>{convertDateTime(comment.date)}</Box>
					</Box>
					<Box
						sx={{
							padding: '1rem',
							backgroundColor: 'white',
							transition: '5s',
						}}
					>
						<Box sx={{ width: '100%', textAlign: 'left' }}>
							<Box sx={{ marginBottom: '16px' }}>{comment.title}</Box>
							<Box sx={{ marginBottom: '16px' }}>
								<span style={{ color: 'green' }}>Плюсы:</span>
								{comment.cons}
							</Box>
							<Box sx={{ marginBottom: '16px' }}>
								<span style={{ color: 'red' }}>Минусы:</span>
								{comment.pros}
							</Box>
						</Box>

						{readAll ? (
							<>
								<Box sx={{ marginBottom: '16px' }}>{comment.text}</Box>
								{comment.image.length > 0 && (
									<Box
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
										{comment.image.map((img) => (
											<ScalableImg key={img} img={img} />
										))}
									</Box>
								)}
								{comment.video.length > 0 && (
									<Box
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
										{comment.video.map((vid) => (
											<ScalableVideo key={vid} vid={vid} />
										))}
									</Box>
								)}
							</>
						) : null}

						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<Button
								onClick={() => setReadAll((a) => !a)}
								sx={{ color: '#ff9000' }}
							>
								{readAll ? 'Скрыть' : 'Читать весь отзыв'}
							</Button>
							{(userInfo && userInfo.id === comment.author_id) ||
							(userInfo && userInfo.role === 'admin') ? (
								<Button
									onClick={() =>
										deleteComment(
											comment,
											item,
											'adfka',
											companies.find((i) => i.id === item.companyId)
										)
									}
									sx={{ color: '#ff9000' }}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										// className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth={2}
										width={22}
										height={22}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
										/>
									</svg>
								</Button>
							) : null}
							{userInfo && userInfo.id === comment.author_id && (
								<Button onClick={() => setEdit(true)} sx={{ color: '#ff9000' }}>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth={2}
										width={22}
										height={22}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
										/>
									</svg>
								</Button>
							)}
						</Box>
					</Box>
				</Box>
			) : (
				<CommentForm
					saveValues={editComment}
					onClose={setEdit}
					compForEdit={true}
					forEditVal={comment}
					item={item}
				/>
			)}
		</div>
	);
};

export default OneComment;
