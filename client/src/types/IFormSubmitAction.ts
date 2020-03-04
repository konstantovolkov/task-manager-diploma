import { IFormState } from './IFormState';

export interface IFormSubmitAction {
  (inputData: IFormState): void;
}
