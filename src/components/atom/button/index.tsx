/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
import type { ReactElement, ReactNode } from "react";

export interface ButtonProps {
  className?: string;
  children: ReactNode;
  title: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: string;
}

export interface ButtonWithIconProps extends ButtonProps {
  showIcon?: boolean;
  icon?: JSX.Element | ReactElement;
}

export function Button({
  className = "button-base",
  children,
  onClick,
  disabled = false,
  type = "button",
  title = "Button",
}: ButtonProps): JSX.Element {
  if (type === "submit") {
    return (
      <button
        className={className}
        type="submit"
        onClick={onClick}
        disabled={disabled}
        aria-label={title}
        aria-disabled={disabled}
        title={title}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={title}
      aria-disabled={disabled}
      title={title}
    >
      {title}
    </button>
  );
}

export function ButtonWithIcon({
  className = "button-base flex items-center justify-center",
  onClick,
  disabled = false,
  type = "button",
  showIcon = true,
  icon,
  title = "Button",
  children,
}: ButtonWithIconProps): JSX.Element {
  if (type === "submit") {
    return (
      <button
        className={className}
        type="submit"
        onClick={onClick}
        disabled={disabled}
        aria-label={title}
        aria-disabled={disabled}
        title={title}
      >
        {showIcon && icon}
        {" "}
        {children}
      </button>
    );
  }

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={title}
      aria-disabled={disabled}
      title={title}
    >
      {showIcon && icon}
      {" "}
      {title}
    </button>
  );
}
