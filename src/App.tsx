import { Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./app/routes";

export default function App() {
  return (
    <Routes>
      {PublicRoutes.flatMap((route: RouteConfig) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
}
