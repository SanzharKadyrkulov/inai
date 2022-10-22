import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import OneItem from '../OneItem/OneItem';

const CompanyList = () => {
	const { companies } = useSelector((state) => state.company);
	const { getCompanies } = useActions();
	useEffect(() => {
		getCompanies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div>
			<Grid container spacing={4}>
				{companies && companies.length > 0 ? (
					companies.map((item) => (
						<OneItem link={`/objects/${item.id}`} key={item.id} item={item} />
					))
				) : (
					<h2>Loading...</h2>
				)}
			</Grid>
		</div>
	);
};

export default CompanyList;
