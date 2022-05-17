import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "redaxios";

import { useAppDispatch, useAppSelector } from "./app";
import { PublicRoutes } from "./app/routes";
import { LoadingIcon } from "./components/atom";
import config from "./config";
import { logout, setAuth } from "./features/auth";
import { User } from "./features/auth/types";

export interface GetProfileSucessResponse {
  uid: string;
  username: string;
  email: string;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const { isAuth, token } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      navigate("/");
      dispatch(logout());
      return;
    }

    const getProfile = async () => {
      try {
        const response = await axios<HttpResponse<GetProfileSucessResponse>>({
          url: `${config.api.url}/user`,
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": config.api.key,
          },
        });

        if (response.status === 200 && response.data.status === "success" && response.data.statusCode === 200) {
          dispatch(setAuth(response?.data?.data as User));
          setIsLoading(false);
          return;
        }

        dispatch(logout());
        setIsLoading(false);
        navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        dispatch(logout());
        setIsLoading(false);
        navigate("/");
      }
    };

    getProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingIcon className="border-primary w-8 h-8 sm:w-9 sm:h-9" />
      </div>
    );
  }

  if (isAuth) {
    return (
      <h1>hello world</h1>
    );
  }

  return (
    <Routes>
      {PublicRoutes.flatMap((route: RouteConfig) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
}
