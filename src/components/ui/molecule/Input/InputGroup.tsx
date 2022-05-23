import type { InputGroupProps } from "./types";

export const InputGroup = {
  /**
   * @description renders a group of inputs with a label
   * @param {InputGroupProps} props
   * @returns
   */
  withLabel: ({
    label,
    children,
    className = "mb-4",
    required,
    targetId,
  }: InputGroupProps): JSX.Element => (
    <div className={`${className}`}>
      <label htmlFor={targetId} className="block mb-2">
        {label}
        {" "}
        {required && <span className="text-error">*</span>}
      </label>

      {children}
    </div>
  ),

  /**
   * @description renders a group of inputs checkbox with a label
   * @param {InputGroupProps} props
   * @returns
   */
  checkbox: ({
    label,
    targetId,
    className = "mb-4",
    children,
    disabled,
  }: InputGroupProps): JSX.Element => (
    <div className={className ? `${className}` : "flex items-center gap-2"}>
      {children}

      <label htmlFor={targetId} className={disabled ? "opacity-50" : ""}>{label}</label>
    </div>
  ),
};
