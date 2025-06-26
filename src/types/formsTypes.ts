import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface TextAreaProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  maxlength?: number;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  mask?: string;
  rows: number;
}

export interface SelectProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  selectOptions: string[];
  primarySelectOption?: string;
}

export interface CheckboxProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label?: string;
  type: string;
  maxlength?: number;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  mask?: string;
  showPasswordToggle?: boolean;
}