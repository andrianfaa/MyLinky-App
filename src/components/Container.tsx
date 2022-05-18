/* eslint-disable react/require-default-props */
import type { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "w-full p-6",
}: ContainerProps): JSX.Element {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
