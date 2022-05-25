/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import { ChevronDownIcon } from "../../../assets/icons";

export interface SelectProps{
  className?: string;
  parentClassName?: string;
  style?: React.CSSProperties;
  name?: string;
  data: {
    label: string;
    value: string;
  }[];
  onChange: any;
  value?: string;
  index: number;
}

export function Select({
  className,
  parentClassName,
  style,
  data,
  name,
  onChange,
  value,
  index,
}: SelectProps): JSX.Element {
  const [isExpand, setIsExpand] = useState(false);

  const handleClick = (val: string | null, key: number): void => {
    onChange(name, val, key);
  };

  return (
    <div className={`relative w-full ${parentClassName}`}>
      <button
        type="button"
        id={`${name}-${index}`}
        className={`button-base flex items-center justify-between gap-2 px-3 py-2 ${className}`}
        onClick={() => setIsExpand(!isExpand)}
        style={style}
        onKeyDown={(event) => {
          if (!isExpand) return;

          if (event.key === "ArrowDown") {
            event.preventDefault();

            const next = document.getElementById("select-0");
            if (next) {
              next.focus();
            }
          }
        }}
      >
        <span className="first-letter:uppercase">{value}</span>
        {" "}
        {isExpand ? <ChevronDownIcon className="w-4 h-4 rotate-180" /> : <ChevronDownIcon className="w-4 h-4" />}
      </button>

      {isExpand && (
        <ul
          className={`absolute top-12 z-10 w-full bg-white shadow-md rounded-lg border border-light-3 ${parentClassName}`}
        >
          {data.map((item, itemIndex) => (
            <li
              key={Math.floor(Math.random() * 121231233)}
              id={`select-${itemIndex}`}
              className="py-2 px-3 cursor-pointer hover:bg-light-3 overflow-hidden first:rounded-tl-lg first:rounded-tr-lg last:rounded-bl-lg last:rounded-br-lg"
              tabIndex={0}
              onClick={() => {
                handleClick(item.value, index);
                setIsExpand(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setIsExpand(false);
                  handleClick(item.value, index);
                  document.getElementById(`${name}-${index}`)?.focus();
                }

                if (event.key === "Escape") {
                  setIsExpand(false);
                  document.getElementById(`${name}-${index}`)?.focus();
                }

                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  event.stopPropagation();

                  const next = document.getElementById(`select-${itemIndex + 1}`);
                  if (next) {
                    next.focus();
                  }
                }

                if (event.key === "ArrowUp") {
                  event.preventDefault();
                  event.stopPropagation();

                  const prev = document.getElementById(`select-${itemIndex - 1}`);
                  if (prev) {
                    prev.focus();
                  }
                }
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
