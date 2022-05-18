import { Button, SidebarMenuItem } from "../../atom";
import type { SidebarMenuProps } from "./types";
// import { LogoWithText } from "../../../../assets/images";
import { useAppSelector, useAppDispatch } from "../../../../app";
import { logout } from "../../../../features/auth";
import { LogoutIcon } from "../../../../assets/icons";

export function Sidebar({
  items,
}: SidebarMenuProps): JSX.Element {
  const { user } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();

  return (
    <div className="md:border-r md:border-r-light-3 bg-white h-screen w-full fixed z-50 top-0 left-0 md:static md:w-[300px] flex flex-col justify-between">
      <div className="w-full">
        {/* <LogoWithText className="scale-150 mx-auto mb-8 mt-4" /> */}

        <ul className="flex flex-col gap-1 p-3">
          {items.map(({ icon, label, path }) => (
            <SidebarMenuItem key={path} icon={icon} label={label} path={path} />
          ))}
        </ul>
      </div>

      <div className="flex items-center border-t border-t-light-3 px-3 py-4">
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
          }}
          title="Logout"
        >
          <LogoutIcon className="hover:text-primary focus:text-primary" />
        </Button.button>
      </div>
    </div>
  );
}
