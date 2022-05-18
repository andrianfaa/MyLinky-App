import type { MenuItem } from "../../atom";

export interface SidebarMenuProps {
  items: MenuItem[];
  open: boolean;
  setIsSidebarOpen?: (isOpen: boolean) => void;
}
