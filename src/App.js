import { useEffect } from 'react';
import './App.css';
import useActions from './hooks/useActions';
import MyRoutes from './routes/MyRoutes';

function App() {
	const { checkAuth, getConstants } = useActions();
	useEffect(() => {
		getConstants();
		if (localStorage.getItem('token')) {
			checkAuth();
		}
	}, []);
	return (
		<div className='App'>
			<MyRoutes />
		</div>
	);
}

export default App;
