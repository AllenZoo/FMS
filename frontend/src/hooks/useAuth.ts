import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

import { selectCurrentToken } from "@/app/auth/auth.slice";


export const Role: Record<string, number> = {
	ADMIN: 3,
	FARMER: 2,
	GUEST: 1,
	UNKNOWN: 0,
}

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */
/**
 * Checks if user is authenticated and returns user data.
 * @returns User data.
 */
const useAuth = (): AuthData => {
	const token = useSelector(selectCurrentToken) as string | null;

	if (token) {
		const { sub, scope }: { sub: string, scope: string } = jwtDecode(token);
		return { username: sub, role: parseInt(scope) };
	}

	return { username: "", role: Role.UNKNOWN };
};

export default useAuth;
