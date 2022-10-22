import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	books: [],
	myBooks: [],
	myOrders: [],
	book: null,
	loading: false,
	error: null,
};
const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		setBooksLoading: (state) => {
			state.loading = true;
		},
		setBooksError: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		getBooksSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.books = action.payload;
		},
		getMyBooksSuccess: (state, action) => {
			state.myBooks = action.payload;
		},
		getMyOrdersSuccess: (state, action) => {
			state.myOrders = action.payload;
		},
		getOneBookSuccess: (state, action) => {
			state.book = action.payload;
		},
		addBookSuccess: (state, action) => {
			state.books.push(action.payload);
		},
		deleteBookSuccess: (state, action) => {
			state.books = state.books.filter((i) => i.id !== action.payload);
		},
		updateBookSuccess: (state, action) => ({
			...state,
			books: state.books.map((i) =>
				i.id === action.payload[0] ? action.payload[1] : i
			),
		}),
	},
});

export const bookReducer = bookSlice.reducer;
export const {
	setBooksLoading,
	setBooksError,
	getBooksSuccess,
	addBookSuccess,
	deleteBookSuccess,
	updateBookSuccess,
	getOneBookSuccess,
	getMyBooksSuccess,
	getMyOrdersSuccess,
} = bookSlice.actions;
