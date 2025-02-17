import { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import RequireAuth from "./app/auth/RequireAuth";
import PersistAuth from "./app/auth/PersistAuth";

import BackgroundContext from "./contexts/BackgroundContext";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

import { ROUTES, getRouteFromPath, getPathFromRoute } from "./configs/routes";
import { Role } from "./hooks/useAuth";
import NurtureAnimalsPanel from "./pages/DashboardPage/FarmActionsPage/NurtureAnimalsPage/NurtureAnimalsPanel";

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Routes for the application.
 * @returns The application routes.
 */
const AppRoutes = (): React.ReactElement => {
  const { pathname } = useLocation();
  const { setBackground } = useContext(BackgroundContext);

  /**
   * Sets the page title and background image based on the current route.
   */
  useEffect(() => {
    const route = getRouteFromPath(pathname);
    if (route) {
      document.title = route.title + " | Farm Management System";

      if (route.background) setBackground(route.background);
    }
  }, [pathname]);

  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<PersistAuth />}>
        <Route
          path="/"
          element={<RequireAuth allowedRoles={[Role.ADMIN, Role.GUEST]} />}
        >
          <Route
            path={getPathFromRoute(ROUTES.FARMER_ACTIONS_LIVESTOCK)}
            element={<NurtureAnimalsPanel />}
          />
          <Route
            path={`${getPathFromRoute(ROUTES.DASHBOARD)}/*`}
            element={<DashboardPage />}
          />
          <Route
            path=""
            element={<Navigate to={getPathFromRoute(ROUTES.DASHBOARD)} />}
          />
          <Route
            path="*"
            element={<Navigate to={getPathFromRoute(ROUTES.DASHBOARD)} />}
          />
        </Route>
      </Route>

      {/* Public Routes */}
      <Route
        path="/"
        element={<Navigate to={getPathFromRoute(ROUTES.LOGIN)} />}
      />
      <Route path={getPathFromRoute(ROUTES.LOGIN)} element={<LoginPage />} />
      <Route
        path="*"
        element={<Navigate to={getPathFromRoute(ROUTES.LOGIN)} />}
      />
    </Routes>
  );
};

/**
 * Renders the main application component.
 * @returns The main application component.
 */
const App = (): React.ReactElement => {
  return (
    <div data-testid="app">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
