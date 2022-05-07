/* eslint-disable jsx-a11y/label-has-associated-control */
import type { ReactElement } from "react";

/* eslint-disable react/require-default-props */
export interface InputProps {
  type: string;
  name: string;
  id: string,
  placeholder: string;
  className?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
  title?: string;
}

export interface InputGroupProps {
  label: string;
  targetId: string;
  className?: string;
  isRequired?: boolean;
  children: React.ReactNode;
}

export interface InputWithIconProps {
  className?: string;
  renderInput: React.ReactNode;
  icon: JSX.Element | ReactElement;
}

export function Input({
  type,
  name,
  id,
  placeholder,
  className = "input-base",
  value,
  onChange,
  pattern,
  required,
  minLength,
  maxLength,
  disabled,
  readOnly,
  title,
}: InputProps): JSX.Element {
  return (
    <input
      className={`input-base ${className}`}
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      pattern={pattern}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      disabled={disabled}
      readOnly={readOnly}
      title={title}
    />
  );
}

export function InputGroup({
  label,
  targetId,
  isRequired,
  className = "mb-4",
  children,
}: InputGroupProps): JSX.Element {
  return (
    <div className={className}>
      <label
        className="block text-dark-2 font-medium mb-2"
        htmlFor={targetId}
      >
        {label}
        {" "}
        {isRequired && <span className="text-error">*</span>}
      </label>
      {children}
    </div>
  );
}

export function InputWithIcon({
  className,
  renderInput,
  icon,
}: InputWithIconProps): JSX.Element {
  return (
    <label className={`flex items-center relative ${className ?? ""}`}>
      <div className="absolute z-0 left-4">
        {icon}
      </div>

      {renderInput}
    </label>

  );
}
