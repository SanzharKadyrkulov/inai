import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
	Card,
	Table,
	Stack,
	Avatar,
	Button,
	Checkbox,
	TableRow,
	TableBody,
	TableCell,
	Container,
	Typography,
	TableContainer,
	TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {
	UserListHead,
	UserListToolbar,
	UserMoreMenu,
} from '../sections/@dashboard/user';
import { useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';
// mock
// import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'title', label: 'Название', alignRight: false },
	{ id: 'author', label: 'Автор', alignRight: false },
	{ id: 'quantity', label: 'Количество', alignRight: false },
	{ id: 'is_active', label: 'В доступе', alignRight: false },
	{ id: 'category', label: 'Категория', alignRight: false },
	{ id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (query) {
		return filter(
			array,
			(_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	}
	return stabilizedThis.map((el) => el[0]);
}

export default function AdminBooks() {
	const [page, setPage] = useState(0);

	const [order, setOrder] = useState('asc');

	const [selected, setSelected] = useState([]);

	const [orderBy, setOrderBy] = useState('title');

	const [filterName, setFilterName] = useState('');

	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [USERLIST, setUSERLIST] = useState([]);

	const {
		book: { books },
		company: { companies },
	} = useSelector((state) => state);
	const { getBooks, deleteBook, getCompanies } = useActions();

	useEffect(() => {
		getBooks();
		// getCompanies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		setUSERLIST(books);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [books]);
	const handleDelete = (prod) => {
		// const company = companies.find((item) => item.id === prod.companyId);
		const answer = window.confirm('Вы уверены, что хотите удалить объект?');
		if (answer) console.log('Продукт удалить нельзя');
		// if (answer) deleteBook(prod, company);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = USERLIST.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleFilterByName = (event) => {
		setFilterName(event.target.value);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

	const filteredUsers = applySortFilter(
		USERLIST,
		getComparator(order, orderBy),
		filterName
	);

	const isUserNotFound = filteredUsers.length === 0;

	return (
		<Page title='Книги'>
			<Container>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					mb={5}
				>
					<Typography variant='h4' gutterBottom>
						Книги
					</Typography>
					<Button
						variant='contained'
						component={RouterLink}
						to='/addBook'
						startIcon={<Iconify icon='eva:plus-fill' />}
					>
						Добавить
					</Button>
				</Stack>

				<Card>
					<UserListToolbar
						numSelected={selected.length}
						filterName={filterName}
						onFilterName={handleFilterByName}
					/>

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<UserListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									rowCount={USERLIST.length}
									numSelected={selected.length}
									onRequestSort={handleRequestSort}
									onSelectAllClick={handleSelectAllClick}
								/>
								<TableBody>
									{filteredUsers
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => {
											const {
												id,
												title,
												author,
												image,
												is_active,
												quantity,
												category,
											} = row;
											const isItemSelected = selected.indexOf(id) !== -1;

											return (
												<TableRow
													hover
													key={id}
													tabIndex={-1}
													role='checkbox'
													selected={isItemSelected}
													aria-checked={isItemSelected}
												>
													<TableCell padding='checkbox'>
														<Checkbox
															checked={isItemSelected}
															onChange={(event) => handleClick(event, id)}
														/>
													</TableCell>
													<TableCell component='th' scope='row' padding='none'>
														<Stack
															direction='row'
															alignItems='center'
															spacing={2}
														>
															<Avatar alt={title} src={image} />
															<Typography variant='subtitle2' noWrap>
																{title}
															</Typography>
														</Stack>
													</TableCell>
													<TableCell align='left'>{author}</TableCell>
													<TableCell align='left'>{quantity}</TableCell>
													<TableCell align='left'>
														{is_active ? 'да' : 'нет'}
													</TableCell>
													<TableCell align='left'>{category.title}</TableCell>
													<TableCell align='right'>
														<UserMoreMenu
															item={row}
															handleDelete={handleDelete}
															isCompany={false}
														/>
													</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow style={{ height: 53 * emptyRows }}>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>

								{isUserNotFound && (
									<TableBody>
										<TableRow>
											<TableCell align='center' colSpan={6} sx={{ py: 3 }}>
												<SearchNotFound searchQuery={filterName} />
											</TableCell>
										</TableRow>
									</TableBody>
								)}
							</Table>
						</TableContainer>
					</Scrollbar>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component='div'
						count={USERLIST.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Card>
			</Container>
		</Page>
	);
}
