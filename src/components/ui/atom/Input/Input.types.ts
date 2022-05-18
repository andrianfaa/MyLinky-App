import type { ChangeEvent, ReactNode, ReactElement } from "react";

export interface InputProps {
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search" | string;
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  title?: string;
  name?: string;
  id?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  autoCorrect?: string;
  showIcon?: boolean;
  leftIcon?: ReactNode | ReactElement | JSX.Element;
  rightIcon?: ReactNode | ReactElement | JSX.Element;
  groupClassName?: string;
}
