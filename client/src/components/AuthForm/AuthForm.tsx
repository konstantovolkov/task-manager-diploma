import React, { useState, ChangeEvent } from 'react';

import { InputField } from '../InputField/InputField';
import { FormTypeToggler } from '../FormTypeToggler/FormTypeToggler';
import { StyledAuthForm } from './StyledAuthForm';
import { FormContainer, formIconColor } from './FormContainer';
import { Icon } from '../Icon/Icon';
import { withHideButton } from '../../hocs/withHideButton';
import { useForm } from '../../hooks/useForm';

import { FormType, InputType } from '../../types/enums';
import { IAuthFormProps } from '../../types/IAuthFormProps';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { IFieldProps } from '../../types/IFieldProps';

const HideableInputField = withHideButton(InputField);

export const AuthForm: React.FC<IAuthFormProps> = ({ formConfig }) => {
  const [formType, setFormType] = useState<FormType>(FormType.REGISTER);
  const { inputs, errors, handleSubmit, handleInputChange, reset } = useForm(
    formConfig[formType].inputs.map(input => input.name),
    formConfig[formType].submitAction,
    formConfig[formType].validators
  );

  const onToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormType(e.target.value as FormType);
    reset();
  };

  return (
    <StyledAuthForm onSubmit={handleSubmit}>
      <FormTypeToggler onToggle={onToggle} currentFormType={formType} />
      <FormContainer>
        {formConfig[formType].inputs.map(inputConfig => {
          const RenderInput =
            inputConfig.type === InputType.PASSWORD
              ? HideableInputField
              : InputField;

          const inputProps: IFieldProps & { key: any } = {
            key: inputConfig.name,
            name: inputConfig.name,
            placeholder: inputConfig.placeholder,
            type: inputConfig.type,
            onChange: handleInputChange,
            value: inputs[inputConfig.name] || '',
            icon: inputConfig.icon ? (
              <Icon size={16} icon={inputConfig.icon} color={formIconColor} />
            ) : null,
            errorMessage: errors[inputConfig.name]
          };

          return <RenderInput {...inputProps} />;
        })}
        <SubmitButton>{formConfig[formType].submitButtonText}</SubmitButton>
      </FormContainer>
    </StyledAuthForm>
  );
};
