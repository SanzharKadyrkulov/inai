import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CompanyList from '../components/Company/CompanyList';
import BookList from '../components/Book/BooksList';
import BookDetails from '../components/Book/BookDetails';
import DashboardLayout from '../pages/Admin/layouts/dashboard';
import MainLayout from '../layouts/MainLayout';
import Add from '../pages/Admin/Add/Add';
import AddBook from '../pages/Admin/Add/AddBook';
import Edit from '../pages/Admin/Edit/Edit';
import EditBook from '../pages/Admin/Edit/EditBook';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import ProtectedRoute from './ProtectedRoute';
import AdminBooks from '../pages/Admin/pages/AdminBooks';
import ThemeProvider from '../theme';
import AdminCompanies from '../pages/Admin/pages/AdminCompanies';
import MyBookList from '../components/Book/MyBookList';
import MyOrdersList from '../components/Book/MyOrdersList';

const MyRoutes = () => {
	const { userInfo } = useSelector((state) => state.user);
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<MainLayout />}>
						<Route path='/' element={<Navigate to='/books' replace />} />
						{/* <Route path='/' element={<CompanyList />} />
						<Route path='/objects/:companyId' element={<ObjectList />} /> */}
						<Route path='/books' element={<BookList />} />
						<Route path='/mybooks' element={<MyBookList />} />
						<Route path='/myorders' element={<MyOrdersList />} />

						<Route path='/signin' element={<SignIn />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/details/:id' element={<BookDetails />} />
					</Route>

					{/* Protected Routes */}
					<Route
						element={
							<ProtectedRoute
								redirectPath='/'
								isAllowed={userInfo && userInfo.role === 'admin'}
							/>
						}
					>
						<Route element={<DashboardLayout />}>
							<Route path='/admin' element={<AdminBooks />} />
							{/* <Route path='/admin' element={<AdminCompanies />} /> */}
							{/* <Route path='/addCompany' element={<Add />} />
							<Route path='/editCompany/:id' element={<Edit />} />
							<Route path='/adminObjects' element={<AdminObjects />} /> */}
							<Route path='/addBook' element={<AddBook />} />
							<Route path='/editBook/:id' element={<EditBook />} />
						</Route>
					</Route>
					{/* Protected Routes END */}
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default MyRoutes;
