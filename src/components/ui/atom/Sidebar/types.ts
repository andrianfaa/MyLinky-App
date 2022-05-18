import type { SVGProps, FunctionComponent } from "react";

export interface MenuItem {
  path: string;
  label?: string | null;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>> | null;
}
