import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
// Private Pages
// import Dashboard from "../pages/private/Dashboard";
import Setting from "../pages/private/Setting";
import Links from "../pages/private/Links";
import LandingPage from "../pages/public/Landing";

import { FlashIcon, SettingIcon, RowIcon } from "../assets/icons";

const PublicRoutes: RouteConfig[] = [
  {
    path: "/",
    element: LandingPage,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/register",
    element: Register,
  },
];

const PrivateRoutes: RouteConfig[] = [
  // {
  //   path: "/",
  //   element: Dashboard,
  //   name: "Dashboard",
  //   icon: FlashIcon,
  // },
  {
    path: "/links",
    element: Links,
    name: "Links",
    icon: RowIcon,
  },
  {
    path: "/setting",
    element: Setting,
    name: "Setting",
    icon: SettingIcon,
  },
];

export { PublicRoutes, PrivateRoutes };
