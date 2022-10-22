import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	companies: [],
	company: null,
	loading: false,
	error: null,
};
const companySlice = createSlice({
	name: 'company',
	initialState,
	reducers: {
		setCompaniesLoading: (state) => {
			state.loading = true;
		},
		setCompaniesError: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		getCompaniesSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.companies = action.payload;
		},
		getOneCompanySuccess: (state, action) => {
			state.company = action.payload;
		},
		addCompanySuccess: (state, action) => {
			state.companies.push(action.payload);
		},
		deleteCompanySuccess: (state, action) => {
			state.companies = state.companies.filter((i) => i.id !== action.payload);
		},
		updateCompanySuccess: (state, action) => ({
			...state,
			comments: state.comments.map((i) =>
				i.id === action.payload[0] ? action.payload[1] : i
			),
		}),
	},
});

export const companyReducer = companySlice.reducer;
export const {
	setCompaniesLoading,
	setCompaniesError,
	getCompaniesSuccess,
	addCompanySuccess,
	deleteCompanySuccess,
	updateCompanySuccess,
	getOneCompanySuccess,
} = companySlice.actions;
