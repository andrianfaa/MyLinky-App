import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app";
import { LogoutIcon } from "../../../../assets/icons";
import { logout } from "../../../../features/auth";
import { Button } from "../../atom";
import type { SidebarMenuProfileProps } from "./types";

export function SidebarMenuProfile({
  position,
}: SidebarMenuProfileProps): JSX.Element {
  const { user } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={`${position === "top" ? "md:hidden flex" : "hidden md:flex border-t border-t-light-3"} items-center px-3 py-4 `}>
      <div className="rounded-full w-10 h-10 bg-primary bg-opacity-25 text-primary flex justify-center items-center flex-none">
        <p className="font-semibold">
          {user?.username?.substring(0, 2).toLocaleUpperCase()}
        </p>
      </div>
      <div className="flex flex-col ml-4">
        <span className="text-sm font-medium">{user?.username ?? ""}</span>
        <small className="text-xs">{user?.email ?? ""}</small>
      </div>

      <Button.button
        className="ml-auto"
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
        title="Logout"
      >
        <LogoutIcon className="hover:text-primary focus:text-primary" />
      </Button.button>
    </div>
  );
}
