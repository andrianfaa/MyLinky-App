/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import { useAppSelector } from "../../../app";
import { CloseIcon, QRCodeIcon } from "../../../assets/icons";
import type { MenuItem } from "../atom";
import { Button, SidebarMenuItem, SidebarMenuProfile } from "../atom";

export interface SidebarMenuProps {
  items: MenuItem[];
  open: boolean;
  setIsSidebarOpen?: (isOpen: boolean) => void;
}

export function Sidebar({
  items,
  open,
  setIsSidebarOpen,
}: SidebarMenuProps): JSX.Element {
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);

  const QRCodeRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector(({ auth }) => auth);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const CLIENT_URL = process.env.REACT_APP_BASE_URL as string || "http://localhost:3000";

  const handleOnClick = (path: string) => {
    if (setIsSidebarOpen && open) setIsSidebarOpen(false);
    navigate(path);
  };

  const handleDownloadQRCode = async () => {
    const target = QRCodeRef.current;
    const canvas = await html2canvas(target as HTMLElement);
    const link = document.createElement("a");

    link.href = canvas.toDataURL("image/png");
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <>
      <div className={
        `md:border-r md:border-r-light-3 bg-white h-screen w-full fixed z-40 top-0 left-0 md:static md:w-[300px] flex flex-col justify-between transition-left duration-200 ease-in-out ${open ? "left-0" : "-left-full"}`
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

          <div className="flex flex-col gap-1 p-3">
            {items.map(({ icon, label, path }) => (
              <SidebarMenuItem onClick={() => handleOnClick(path)} key={path} icon={icon} label={label} path={path} />
            ))}

            <div
              className="transition-[background] duration-200 ease-in-out p-4 rounded-lg flex items-center flex-1 hover:bg-dark-4 hover:bg-opacity-10 focus:bg-primary focus:text-white cursor-pointer"
              onClick={() => setIsQRCodeOpen(true)}
            >
              <QRCodeIcon className="w-6 h-6 mr-3" />
              {" "}
              Scan QR code
            </div>
          </div>
        </div>

        <SidebarMenuProfile position="bottom" />
      </div>

      {isQRCodeOpen && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-end sm:items-center justify-center bg-black bg-opacity-50" onClick={() => setIsQRCodeOpen(false)}>
          {/* Downloaded QR Code */}
          <div ref={QRCodeRef} className="absolute z-20 -left-[500px] -top-[500px] w-[256px] h-[256px] md:w-[350px] md:h-[350px]">
            <QRCodeSVG
              value={`${CLIENT_URL}/${user?.username}`}
              size={isMobile ? 256 : 350}
              level="H"
              includeMargin
            />
          </div>

          <div className=" bg-white w-full sm:max-w-[425px] flex flex-col items-center rounded-tr-lg rounded-tl-lg sm:rounded-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-dark-1 mb-6">
              Scan QR code
            </h2>

            <div className="relative flex items-center justify-center">
              <QRCodeSVG
                value={`${CLIENT_URL}/${user?.username}`}
                size={isMobile ? 256 : 350}
                level="H"
                id="qrcode"
                imageSettings={{
                  src: user?.avatar as string,
                  height: isMobile ? 100 : 150,
                  width: isMobile ? 100 : 150,
                  excavate: false,
                }}
              />

              <img src={user?.avatar as string} alt="avatar" className="absolute w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-cover" />
            </div>

            <span className="mt-6 block">
              {CLIENT_URL}
              /
              {user?.username}
            </span>

            <Button.ButtonWithIcon
              className="mt-4 flex items-center justify-center button-base button-primary"
              onClick={handleDownloadQRCode}
              showIcon
              leftIcon={<QRCodeIcon className="w-6 h-6" />}
              title="Download QR code"
            >
              Download QR code
            </Button.ButtonWithIcon>
          </div>
        </div>
      )}
    </>
  );
}
