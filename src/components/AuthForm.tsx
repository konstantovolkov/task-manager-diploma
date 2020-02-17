import React, { useState, ChangeEvent } from 'react';

import { InputField } from './InputField';
import { FormTypeToggler } from './FormTypeToggler';
import { StyledForm } from './StyledForm';
import { FormContainer } from './FormContainer';
import { Icon } from './Icon';
import { useForm } from '../hooks/useForm';

import { FormType } from '../types/enums';
import { IAuthFormProps } from '../types/IAuthFormProps';

export const AuthForm: React.FC<IAuthFormProps> = ({ formConfig }) => {
  const [formType, setFormType] = useState<FormType>(FormType.LOGIN);
  const { inputs, handleSubmit, handleInputChange, reset } = useForm(
    formData => {
      alert(Object.entries(formData));
    }
  );

  const onToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormType(e.target.value as FormType);
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormTypeToggler onToggle={onToggle} currentFormType={formType} />
      <FormContainer>
        {formConfig[formType].inputs.map(inputConfig => {
          return (
            <InputField
              key={`${inputConfig.key}.${formType}`}
              name={inputConfig.name}
              placeholder={inputConfig.placeholder}
              type={inputConfig.type}
              onChange={handleInputChange}
              value={inputs[inputConfig.name]}
            >
              {inputConfig.icon ? (
                <Icon size={16} icon={inputConfig.icon} color="#c7c9c9" />
              ) : null}
            </InputField>
          );
        })}
        <button type="submit">{formType}</button>
      </FormContainer>
    </StyledForm>
  );
};
