import type { ReactNode } from "react";

export interface InputGroupProps {
  label: string;
  targetId?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}
