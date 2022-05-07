/* eslint-disable react/require-default-props */
export interface LoadingIconProps {
  size?: "small" | "normal" | "large";
  className?: string;
}

export function LoadingIcon({
  size = "normal",
  className = "border-white",
}: LoadingIconProps): JSX.Element {
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
