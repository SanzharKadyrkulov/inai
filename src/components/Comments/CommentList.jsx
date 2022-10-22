import { Box } from '@mui/material';
import React from 'react';
import OneComment from './OneComment';

const CommentList = ({ comments, item }) => {
	return (
		<Box>
			{comments.length > 0 &&
				comments.map((comment) => (
					<OneComment item={item} key={comment.id} comment={comment} />
				))}
		</Box>
	);
};

export default CommentList;
