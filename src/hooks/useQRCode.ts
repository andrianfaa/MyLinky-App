import html2canvas from "html2canvas";
import type { RefObject } from "react";
import { QRCodeSVG } from "qrcode.react";

export function useQRCode<T>(ref: RefObject<T | HTMLElement>) {
  const downloadQRCode = async () => {
    const canvas = await html2canvas(ref.current as HTMLElement);
    const link = document.createElement("a");

    link.href = canvas.toDataURL("image/png");
    link.download = "qrcode.png";
    link.click();
  };

  return {
    downloadQRCode,
    QRCodeSVG,
  };
}
