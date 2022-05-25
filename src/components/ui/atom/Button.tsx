/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */
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

export const Button = {
  /**
   * @description Button component
   * @param {ButtonProps} props
   * @returns
   */
  button: ({
    className = "button-base",
    children,
    onClick,
    title,
    disabled = false,
  }: ButtonProps): JSX.Element => (
    <button
      className={className}
      type="button"
      onClick={onClick}
      title={title ?? "Button"}
      disabled={disabled}
      aria-label={title ?? "Button"}
      aria-disabled={disabled}
    >
      {children}
    </button>
  ),

  /**
   * @description Button submit component
   * @param {ButtonProps} props
   * @returns
   */
  submit: ({
    className = "button-base",
    children,
    onClick,
    title,
    disabled = false,
  }: ButtonProps): JSX.Element => (
    <button
      className={className}
      type="submit"
      onClick={onClick}
      title={title ?? "Button"}
      disabled={disabled}
      aria-label={title ?? "Button"}
      aria-disabled={disabled}
    >
      {children}
    </button>
  ),

  /**
   * @description Button with icon component
   * @param {ButtonWithIconProps} props
   * @returns
   */
  ButtonWithIcon: ({
    className = "button-base flex items-center justify-center",
    onClick,
    disabled = false,
    title,
    type,
    showIcon = true,
    leftIcon,
    rightIcon,
    children,
  }: ButtonWithIconProps): JSX.Element => (
    <button
      className={className}
      type={type ?? "button"}
      onClick={onClick}
      title={title ?? "Button"}
      disabled={disabled}
      aria-label={title ?? "Button"}
      aria-disabled={disabled}
    >
      {showIcon && leftIcon && <span className="mr-2">{leftIcon}</span>}

      {children}

      {showIcon && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  ),
};
