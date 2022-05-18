import { useEffect, useState } from "react";
import Container from "../../../Container";
import type { NavbarProps } from "./types";

import { Logo, LogoWithText } from "../../../../assets/images";
import { MenuIcon } from "../../../../assets/icons";
import { Button } from "../../atom";

export function Navbar({
  isSidebarOpen,
  setIsSidebarOpen,
}: NavbarProps) {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 768);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setIsMobile(window.innerWidth < 768);
      });
    };
  }, [isMobile]);

  return (
    <nav>
      <Container className="flex-1 p-6 flex items-center justify-between md:m-3 md:shadow-md md:rounded-lg">
        <div className="md:flex md:flex-1 hidden" />

        {isMobile
          ? <Logo className="w-8 h-8" />
          : <LogoWithText className="scale-125 mx-2" />}

        <div className="md:flex md:flex-1 hidden" />

        <Button.button
          className="md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title="Open sidebar"
        >
          <MenuIcon className="w-6 h-6" />
        </Button.button>
      </Container>
    </nav>
  );
}
