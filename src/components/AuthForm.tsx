import React, { useState, ChangeEvent } from 'react';

import { InputField } from './InputField';
import { FormTypeToggler } from './FormTypeToggler';
import { StyledForm } from './StyledForm';
import { FormContainer, formIconColor } from './FormContainer';
import { Icon } from './Icon';
import { withHideButton } from '../hocs/withHideButton';
import { useForm } from '../hooks/useForm';

import { FormType, InputType } from '../types/enums';
import { IAuthFormProps } from '../types/IAuthFormProps';
import { SubmitButton } from './SubmitButton';
import { IFieldProps } from '../types/IFieldProps';

const HideableInputField = withHideButton(InputField)

export const AuthForm: React.FC<IAuthFormProps> = ({ formConfig }) => {
  const [formType, setFormType] = useState<FormType>(FormType.LOGIN);
  const { inputs, handleSubmit, handleInputChange, reset } = useForm(
    formConfig[formType].submitAction
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
          const RenderInput = inputConfig.type === InputType.PASSWORD ?
            HideableInputField :
            InputField;

          const inputProps: IFieldProps & { key: any } = {
            key: `${inputConfig.key}.${formType}`,
            name: inputConfig.name,
            placeholder: inputConfig.placeholder,
            type: inputConfig.type,
            onChange: handleInputChange,
            value: inputs[inputConfig.name],
            icon: 
              inputConfig.icon ? (
                <Icon
                  size={16}
                  icon={inputConfig.icon}
                  color={formIconColor}
                />
              ) : null
          }

          return (
            <RenderInput {...inputProps} />
          );
        })}
        <SubmitButton>{formConfig[formType].submitButtonText}</SubmitButton>
      </FormContainer>
    </StyledForm>
  );
};

