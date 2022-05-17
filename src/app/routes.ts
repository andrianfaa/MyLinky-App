import Login from "../pages/login";
import Register from "../pages/register";

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

export { PublicRoutes };
