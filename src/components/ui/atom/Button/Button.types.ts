import type { ReactNode, ReactElement } from "react";

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export interface ButtonWithIconProps extends ButtonProps {
  type?: "button" | "submit" | "reset";
  showIcon?: boolean;
  leftIcon?: ReactNode | ReactElement | JSX.Element;
  rightIcon?: ReactNode | ReactElement | JSX.Element;
}
