import { FunctionComponent, ReactElement } from "react";

declare global {
  interface HttpResponse<T> {
    status: string;
    statusCode: number;
    message?: string;
    data?: T;
  }

  interface RouteConfig {
    path: string;
    element: JSX.Element | ReactElement | function;
    icon?: FunctionComponent<SVGProps<SVGSVGElement>> | null;
    name?: string;
  }

  interface LocationState<T> {
    state?: T;
  }
}

export { };
