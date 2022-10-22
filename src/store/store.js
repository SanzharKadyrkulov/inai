import { configureStore } from '@reduxjs/toolkit';
import { commentReducer } from './comment/comment.slice';
import { companyReducer } from './company/company.slice';
import { bookReducer } from './book/book.slice';
import { searchReducer } from './search/search.slice';
import { userReducer } from './user/user.slice';
import { constantsReducer } from './constants/constants.slice';

export const store = configureStore({
	reducer: {
		company: companyReducer,
		user: userReducer,
		book: bookReducer,
		comment: commentReducer,
		search: searchReducer,
		constants: constantsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			thunk: true,
		}),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
