import type { SpinnerIconProps } from "./types";

export function Spinner({
  size = "normal",
  className = "border-white",
}: SpinnerIconProps): JSX.Element {
  if (size === "small") {
    return (
      <div className={`border-y-4 border-y-transparent border-x-4 ${className} w-4 h-4 rounded-full animate-spin-fast`} />
    );
  }

  if (size === "large") {
    return (
      <div className={`border-y-4 border-y-transparent border-x-4 ${className} w-8 h-8 rounded-full animate-spin-fast`} />
    );
  }

  return (
    <div className={`border-y-4 border-y-transparent border-x-4 ${className} w-6 h-6 rounded-full animate-spin-fast`} />
  );
}
