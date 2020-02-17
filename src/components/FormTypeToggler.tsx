import React from 'react';
import { FormType } from '../types/enums';
import { StyledFormToggler } from './StyledFormToggler';
import { StyledInputToggler } from './StyledInputToggler';
import { IFormTypeTogglerProps } from '../types/IFormTypeTogglerProps';

export const FormTypeToggler: React.FC<IFormTypeTogglerProps> = ({
  onToggle,
  currentFormType
}) => {
  const formTypes: Array<string> = Object.values(FormType);

  const togglers = formTypes.map(formType => {
    const isChecked: boolean = currentFormType === formType;
    return (
      <StyledInputToggler htmlFor={formType} key={formType} checked={isChecked}>
        <input
          type="radio"
          name="formType"
          id={formType}
          onChange={onToggle}
          value={formType}
          checked={isChecked}
        />
        {formType}
      </StyledInputToggler>
    );
  });

  return <StyledFormToggler>{togglers}</StyledFormToggler>;
};
