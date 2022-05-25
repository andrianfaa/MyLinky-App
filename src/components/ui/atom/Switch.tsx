/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
export interface SwitchProps {
  id: string;
  title?: string;
  name?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function Switch({
  id,
  title,
  name,
  checked = false,
  onChange,
  disabled = false,
}: SwitchProps): JSX.Element {
  return (
    <label
      className={
        `w-10 h-5 rounded-3xl transition-all duration-300 ease-in-out ${checked ? "bg-primary justify-end" : "bg-light-4 justify-start"} relative p-[.175rem] flex items-center cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`
      }
      title={title}
    >
      <div
        className="block w-3.5 h-3.5 cursor-pointer rounded-full bg-white"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            document.getElementById(id)?.click();
          }
        }}
      >
        <input
          type="checkbox"
          name={name}
          id={id}
          className="hidden"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </label>
  );
}
