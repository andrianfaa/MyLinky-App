import type { SVGProps, FunctionComponent } from "react";

export interface MenuItem {
  path: string;
  label?: string | null;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>> | null;
  onClick?: () => void;
}

export interface SidebarMenuProfileProps {
  position: "top" | "bottom";
}
