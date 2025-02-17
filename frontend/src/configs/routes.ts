import FieldBackground from "@/assets/images/backgrounds/background.png";
import BarnBackground from "@/assets/images/backgrounds/background2.png";

/**
 * Interface for a route.
 */
interface IRoute {
  pathname: string;
  title: string;
  background?: string;
}

/**
 * Routes for the application.
 * @readonly
 */
export const ROUTES: Record<string, IRoute> = {
  LOGIN: {
    pathname: "/login",
    title: "Login",
    background: FieldBackground,
  },
  DASHBOARD: {
    pathname: "/dashboard",
    title: "Dashboard",
    background: BarnBackground,
  },
  FARMER_ACTIONS: {
    pathname: "/dashboard/farmer-actions",
    title: "Farmer Actions",
  },
  FARMER_ACTIONS_LIVESTOCK: {
    pathname: "/livestock",
    title: "Livestock",
  },
  FARMER_ACTIONS_CROPS: {
    pathname: "/crops",
    title: "Crops",
  },
  FARMER_ACTIONS_FIELDS: {
    pathname: "/fields",
    title: "Fields",
  },
  FARMER_ACTIONS_PRODUCTS: {
    pathname: "/products",
    title: "Products",
  },
  FARMER_ACTIONS_FACILITIES: {
    pathname: "/facilities",
    title: "Facilities",
  },
  USER_INFO: {
    pathname: "/dashboard/user-info",
    title: "User Info",
  },
  COMPANY_FUN_FACTS: {
    pathname: "/dashboard/company-fun-facts",
    title: "Company Fun Facts",
  },
  HOUSING: {
    pathname: "/dashboard/housing",
    title: "Housing",
  },
};

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
/**
 * Gets the pathname from the given route.
 * @param route The route to get the pathname from.
 * @returns The pathname of the route.
 */
export function getPathFromRoute(route: IRoute): string {
  return route.pathname;
}

/**
 * Get route object from given pathname.
 * @param pathname The pathname of the route.
 * @returns The route object if found, undefined otherwise.
 */
export function getRouteFromPath(pathname: string): IRoute | undefined {
  return Object.values(ROUTES).find((route) => route.pathname === pathname);
}
