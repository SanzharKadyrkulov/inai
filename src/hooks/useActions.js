import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as companyActions from '../store/company/company.actions';
import * as bookActions from '../store/book/book.actions';
import * as commentActions from '../store/comment/comment.actions';
import * as searchActions from '../store/search/search.actions';
import * as userActions from '../store/user/user.actions';
import * as constantActions from '../store/constants/constants.actions';

const AllActions = {
	...companyActions,
	...userActions,
	...bookActions,
	...commentActions,
	...searchActions,
	...constantActions,
};

const useActions = () => {
	const dispatch = useDispatch();

	return bindActionCreators(AllActions, dispatch);
};

export default useActions;
