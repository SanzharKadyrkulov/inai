import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isAllowed, redirectPath = '/signin', children }) {
	if (!isAllowed) {
		return <Navigate to={redirectPath} replace />;
	}
	return children || <Outlet />;
}

export default ProtectedRoute;
