import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
	disabledLink: PropTypes.bool,
	sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
	const logo = (
		<Box
			component='img'
			src='https://osk.kg/images/logo_orange-77981883dce2c6a68c5f64b906c7c078.svg?vsn=d'
			sx={{ width: 40, height: 40, ...sx }}
		/>
	);

	if (disabledLink) {
		return <>{logo}</>;
	}

	return <RouterLink to='/'>{logo}</RouterLink>;
}
