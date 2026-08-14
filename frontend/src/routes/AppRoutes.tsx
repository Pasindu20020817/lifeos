// Import React Router components
import { Route, Routes } from "react-router-dom";

// Import pages
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";

/**
 * AppRoutes
 *
 * This file contains the main route configuration
 * for the LifeOS frontend.
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Login page */}
      <Route path="/login" element={<LoginPage />}/>
      {/* Registration page */}
      <Route path="/register" element={<RegisterPage />}/>
      {/* Main LifeOS dashboard */}
      <Route path="/dashboard" element={<DashboardPage />}/>
      {/* "*" means any route that doesn't match one of the routes above.*/}
      <Route path="*" element={<NotFoundPage />}/>

    </Routes>
  );
}

export default AppRoutes;