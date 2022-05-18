import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../../../../assets/icons";
import { Button, SidebarMenuItem, SidebarMenuProfile } from "../../atom";
import type { SidebarMenuProps } from "./types";

export function Sidebar({
  items,
  open,
  setIsSidebarOpen,
}: SidebarMenuProps): JSX.Element {
  const navigate = useNavigate();

  const handleOnClick = (path: string) => {
    if (setIsSidebarOpen && open) setIsSidebarOpen(false);
    navigate(path);
  };

  return (
    <div className={
      `md:border-r md:border-r-light-3 bg-white h-screen w-full fixed z-50 top-0 left-0 md:static md:w-[300px] flex flex-col justify-between transition-left duration-200 ease-in-out ${open ? "left-0" : "-left-full"}`
    }
    >
      <div className="w-full p-3">
        <div className="md:hidden flex w-full mb-4 pr-3 pt-3 justify-end">
          <Button.button
            className=""
            onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
            title="Close sidebar"
          >
            <CloseIcon className="w-6 h-6" />
          </Button.button>
        </div>

        <SidebarMenuProfile position="top" />

        <ul className="flex flex-col gap-1 p-3">
          {items.map(({ icon, label, path }) => (
            <SidebarMenuItem onClick={() => handleOnClick(path)} key={path} icon={icon} label={label} path={path} />
          ))}
        </ul>
      </div>

      <SidebarMenuProfile position="bottom" />
    </div>
  );
}
