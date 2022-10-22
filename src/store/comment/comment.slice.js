import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	comments: [],
	comment: null,
	loading: false,
	error: null,
};

const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		setCommentsLoading: (state) => {
			state.loading = true;
		},
		setCommentsError: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		getCommentsSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.comments = action.payload;
		},
		getOneCommentSuccess: (state, action) => {
			state.comment = action.payload;
		},
		addCommentSuccess: (state, action) => {
			state.comments.unshift(action.payload);
		},
		deleteCommentSuccess: (state, action) => {
			state.comments = state.comments.filter((i) => i.id !== action.payload);
		},
		updateCommentSuccess: (state, action) => ({
			...state,
			comments: state.comments.map((i) =>
				i.id === action.payload[0] ? action.payload[1] : i
			),
		}),
	},
});

export const commentReducer = commentSlice.reducer;
export const {
	getCommentsSuccess,
	setCommentsError,
	setCommentsLoading,
	addCommentSuccess,
	deleteCommentSuccess,
	getOneCommentSuccess,
	updateCommentSuccess,
} = commentSlice.actions;
