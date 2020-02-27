import { FormType, IconType, InputType } from './enums';
import { IFormSubmitAction } from './IFormSubmitAction';

interface IInputConfig {
  type: InputType;
  placeholder: string;
  name: string;
  icon?: IconType;
}

export interface IValidator {
  [inputName: string]: {
    isValid: (value: string) => boolean;
    message: string
  }
}

interface IValidatorsConfig {
  validators: IValidator
}

interface IFormConfig {
  inputs: IInputConfig[];
  submitAction: IFormSubmitAction;
  submitButtonText: string;
}

export type TFormTypesRecord = Record<FormType, IFormConfig> & IValidatorsConfig;
