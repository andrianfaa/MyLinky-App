import { ReactElement } from "react";

declare global {
  interface HttpResponse<T> {
    message?: string;
    data?: T;
  }

  interface RouteConfig {
    path: string;
    element: JSX.Element | ReactElement | function;
  }
}

export {};
