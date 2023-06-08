/// src/FormGenerator/types.ts

export type IValues = string | number | boolean;

export type ParentValues = [string, string][];

export interface IFormEntity {
  name: string;
  parentValues: ParentValues;
  value?: IValues;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
    value?: any
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  disabled?: boolean;
  error?: string;
  touch?: boolean;
  [index: string]: any;
}
