import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	maxDays: 30,
	maxBooks: 5,
};

const constantsSlice = createSlice({
	name: 'constants',
	initialState,
	reducers: {
		getDaysSuccess: (state, action) => {
			state.maxDays = action.payload;
		},
		getMaxBooksSuccess: (state, action) => {
			state.maxBooks = action.payload;
		},
	},
});

export const constantsReducer = constantsSlice.reducer;
export const { getDaysSuccess, getMaxBooksSuccess } = constantsSlice.actions;
