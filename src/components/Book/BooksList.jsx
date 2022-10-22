import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import OneItem from '../OneItem/OneItem';

const BookList = () => {
	const { books } = useSelector((state) => state.book);
	const { companyId } = useParams();
	const { getBooks, getFilteredBooks } = useActions();
	useEffect(() => {
		if (companyId) {
			getFilteredBooks(companyId);
		} else {
			getBooks();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [companyId]);
	return (
		<div>
			<Grid container spacing={4}>
				{books && books.length > 0 ? (
					books.map((item) => (
						<OneItem link={`/details/${item.id}`} key={item.id} item={item} />
					))
				) : (
					<h2>Loading...</h2>
				)}
			</Grid>
		</div>
	);
};

export default BookList;
