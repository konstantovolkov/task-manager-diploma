import { FormType, IconType, InputType } from './enums';
import { IFormSubmitAction } from './IFormSubmitAction';

interface IInputConfig {
  type: InputType;
  placeholder: string;
  name: string;
  icon?: IconType;
}

export interface IValidator {
  [inputName: string]: Array<{
    isValid: (value: string) => boolean;
    errorMessage: string;
  }>;
}

interface IFormConfig {
  inputs: IInputConfig[];
  submitAction: IFormSubmitAction;
  submitButtonText: string;
  validators?: IValidator;
}

export type TFormTypesRecord = Record<FormType, IFormConfig>;
