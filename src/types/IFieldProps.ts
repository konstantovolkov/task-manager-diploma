import { InputType } from './enums';

export interface IFieldProps {
  type: InputType;
  name: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string | number;
  children?: React.ReactNode;
}
