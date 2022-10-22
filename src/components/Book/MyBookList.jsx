import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import OneItem from '../OneItem/OneItem';

const MyBookList = () => {
	const {
		book: { myBooks },
		user: { userInfo },
	} = useSelector((state) => state);
	const { getMyBooks } = useActions();
	useEffect(() => {
		if (userInfo) getMyBooks(userInfo.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo]);
	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [myBooks]);

	return (
		<div>
			<Grid container spacing={4}>
				{myBooks && myBooks.length > 0 ? (
					myBooks.map((item) => (
						<OneItem
							link={`/details/${item.book.id}`}
							key={item.book.id}
							item={item.book}
							isExpired={
								Math.floor(new Date(item.date_to).getTime() / 1000) -
									Date.now() >
								0
							}
						/>
					))
				) : (
					<h2>У вас пока нет книг</h2>
				)}
			</Grid>
		</div>
	);
};

export default MyBookList;
