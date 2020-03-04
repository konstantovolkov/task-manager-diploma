import { FormType } from './enums';

export interface IFormTypeTogglerProps {
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentFormType: FormType;
}
