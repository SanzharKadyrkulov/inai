import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userInfo: null,
	loading: false,
};
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginUserSuccess: (state, action) => {
			state.loading = false;
			state.userInfo = action.payload;
		},
		setUserLoading: (state) => {
			state.loading = true;
		},
	},
});

export const userReducer = userSlice.reducer;
export const { loginUserSuccess, setUserLoading } = userSlice.actions;
