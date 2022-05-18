/* eslint-disable jsx-a11y/label-has-associated-control */
import type { InputProps } from "./Input.types";

export const Input = {
  /**
   * @description Default input component
   * @param {InputProps} props
   * @returns
   */
  input: ({
    name,
    id,
    type,
    placeholder,
    className = "input-base",
    value,
    onChange,
    autoComplete,
    title,
    disabled,
    pattern,
    required,
  }: InputProps): JSX.Element => (
    <input
      type={type ?? "text"}
      name={name}
      id={id}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete ?? "off"}
      title={title ?? "Input"}
      disabled={disabled ?? false}
      pattern={pattern}
      required={required ?? false}
    />
  ),

  /**
   * @description Input with icon
   * @param {InputWithIconProps} props
   * @returns
   */
  withIcon: ({
    name,
    id,
    type,
    placeholder,
    groupClassName = "input-group",
    className = "input-base",
    value,
    onChange,
    autoComplete,
    title,
    disabled,
    pattern,
    required,
    showIcon,
    leftIcon,
    rightIcon,
  }: InputProps): JSX.Element => (
    <label className={`flex items-center relative ${groupClassName ?? ""}`}>
      <div className="absolute z-0 left-4">
        {showIcon && leftIcon}
      </div>

      <input
        type={type ?? "text"}
        name={name}
        id={id}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete ?? "off"}
        title={title ?? "Input"}
        disabled={disabled ?? false}
        pattern={pattern}
        required={required ?? false}
      />

      <div className="absolute z-0 right-4">
        {showIcon && rightIcon}
      </div>
    </label>
  ),

  /**
   * @description Input checkbox component
   * @param {InputCheckbox} props
   * @returns
   */
  checkbox: ({
    id,
    required,
    disabled,
  }: InputProps): JSX.Element => (
    <div className="relative">
      <input type="checkbox" id={id} className="input-checkbox" required={required} disabled={disabled} />
      <label
        className="input-checkbox__box"
        htmlFor={id}
      />
    </div>
  ),
};
