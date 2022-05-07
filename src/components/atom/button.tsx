/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
import type { ReactElement } from "react";

export interface ButtonProps {
  className?: string;
  title: string | ReactElement;
  buttonTitle: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: string;
}

export interface ButtonWithIconProps extends ButtonProps {
  showIcon?: boolean;
  icon?: JSX.Element | ReactElement;
}

export function Button({
  className = "button-base",
  title = "Button",
  onClick,
  disabled = false,
  type = "button",
  buttonTitle = "Button",
}: ButtonProps): JSX.Element {
  if (type === "submit") {
    return (
      <button
        className={className}
        type="submit"
        onClick={onClick}
        disabled={disabled}
        aria-label={buttonTitle}
        aria-disabled={disabled}
        title={buttonTitle}
      >
        {title}
      </button>
    );
  }

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={buttonTitle}
      aria-disabled={disabled}
      title={buttonTitle}
    >
      {title}
    </button>
  );
}

export function ButtoNWithIcon({
  className = "button-base flex items-center justify-center",
  title = "Button",
  onClick,
  disabled = false,
  type = "button",
  showIcon = true,
  icon,
  buttonTitle = "Button",
}: ButtonWithIconProps): JSX.Element {
  if (type === "submit") {
    return (
      <button
        className={className}
        type="submit"
        onClick={onClick}
        disabled={disabled}
        aria-label={buttonTitle}
        aria-disabled={disabled}
        title={buttonTitle}
      >
        {showIcon && icon}
        {" "}
        {title}
      </button>
    );
  }

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={buttonTitle}
      aria-disabled={disabled}
      title={buttonTitle}
    >
      {showIcon && icon}
      {" "}
      {title}
    </button>
  );
}
