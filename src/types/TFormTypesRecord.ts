import { FormType, IconType, InputType } from './enums';
import { IFormSubmitAction } from './IFormSubmitAction';

interface IInputConfig {
  key: number;
  type: InputType;
  placeholder: string;
  name: string;
  icon?: IconType;
}

interface IFormConfig {
  inputs: IInputConfig[];
  submitAction: IFormSubmitAction;
}
export type TFormTypesRecord = Record<FormType, IFormConfig>;
