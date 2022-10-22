import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import OneItem from '../OneItem/OneItem';

const MyOrderList = () => {
	const {
		book: { myOrders },
		user: { userInfo },
	} = useSelector((state) => state);
	const { getMyOrders } = useActions();
	useEffect(() => {
		if (userInfo) getMyOrders(userInfo.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo]);
	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [myOrders]);

	return (
		<div>
			<Grid container spacing={4}>
				{myOrders && myOrders.length > 0 ? (
					myOrders.map((item) => (
						<OneItem
							link={`/details/${item.book.id}`}
							key={item.book.id}
							item={item.book}
						/>
					))
				) : (
					<h2>У вас пока нет книг</h2>
				)}
			</Grid>
		</div>
	);
};

export default MyOrderList;
