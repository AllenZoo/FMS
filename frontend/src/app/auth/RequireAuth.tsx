import { useLocation, Navigate, Outlet, Location } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

import { ROUTES, getPathFromRoute } from "@/configs/routes";


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Wrapper component that checks if the user is authenticated and has the required role to access the route.
 * @param {string[]} allowedRoles The roles that are allowed to access the route.
 */
const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }): JSX.Element => {
	const location: Location = useLocation();
	const { role } = useAuth() as { role: number };

	return allowedRoles.includes(role) ? 
		<Outlet /> :
		<Navigate to={getPathFromRoute(ROUTES.LOGIN)} state={{ from: location }} />;
};

export default RequireAuth;
