import { useRef, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      ref.current = value;
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return ref.current;
}
