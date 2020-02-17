import { FormType, IconType, InputType } from './enums';

interface IInputConfig {
  key: number;
  type: InputType;
  placeholder: string;
  name: string;
  icon?: IconType;
}

interface IFormConfig {
  inputs: IInputConfig[];
}
export type TFormTypesRecord = Record<FormType, IFormConfig>;
