// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
	{
		title: 'книги',
		path: '/admin',
		icon: getIcon('eva:pie-chart-2-fill'),
	},
	// {
	//   title: 'admin',
	//   icon: getIcon('eva:settings-2-fill'),
	//   children: [
	//     {
	//       title: 'users',
	//       path: '/dashboard/user',
	//     },
	//     {
	//       title: 'product',
	//       path: '/dashboard/products',
	//     },
	//   ],
	// },
	{
		title: 'Константы',
		path: '/adminObjects',
		icon: getIcon('eva:people-fill'),
	},
];

export default navConfig;
