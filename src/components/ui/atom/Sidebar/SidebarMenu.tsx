/* eslint-disable react/destructuring-assignment */
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import type { MenuItem } from "./types";

export function SidebarMenuItem({
  icon,
  label,
  path,
  onClick,
}: MenuItem) {
  const Icon = icon;
  const resolvedPath = useResolvedPath({
    pathname: path,
  });
  const match = useMatch({
    path: resolvedPath.pathname,
  });

  return (
    <Link onClick={onClick} to={path} className={`${match ? "bg-primary text-white" : "hover:bg-dark-4 hover:bg-opacity-10"} transition-[background] duration-200 ease-in-out p-4 rounded-lg flex items-center flex-1`}>
      {Icon && <Icon className="w-6 h-6 mr-3" />}
      {" "}
      {label ?? ""}
    </Link>
  );
}
