import Login from "../pages/pubilc/Login";
import Register from "../pages/pubilc/Register";
// Private Pages
import Dashboard from "../pages/private/Dashboard";
import Setting from "../pages/private/Setting";

import { FlashIcon, SettingIcon } from "../assets/icons";

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
    path: "/setting",
    element: Setting,
    name: "Setting",
    icon: SettingIcon,
  },
];

export { PublicRoutes, PrivateRoutes };
