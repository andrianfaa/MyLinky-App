import Login from "../pages/pubilc/Login";
import Register from "../pages/pubilc/Register";
// Private Pages
import Dashboard from "../pages/private/Dashboard";

import { FlashIcon } from "../assets/icons";

const PublicRoutes: RouteConfig[] = [
  {
    path: "/",
    element: Login,
  },
  {
    path: "/register",
    element: Register,
  },
];

const PrivateRoutes: RouteConfig[] = [
  {
    path: "/",
    element: Dashboard,
    name: "Dashboard",
    icon: FlashIcon,
  },
  {
    path: "/register",
    element: Register,
    name: "Register",
  },
];

export { PublicRoutes, PrivateRoutes };
