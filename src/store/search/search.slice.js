import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchItems: [],
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		getSearchSuccess: (state, action) => {
			state.searchItems = action.payload;
		},
	},
});

export const searchReducer = searchSlice.reducer;
export const { getSearchSuccess } = searchSlice.actions;
