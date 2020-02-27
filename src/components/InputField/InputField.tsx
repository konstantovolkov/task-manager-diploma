import React from 'react';
import { InputContainer } from './InputContainer';
import { IFieldProps } from '../../types/IFieldProps';
import { InputAlert } from './InputAlert';

export const InputField: React.FC<IFieldProps> = ({
  type,
  name,
  placeholder,
  onChange,
  value,
  icon,
  errorMessage,
  children
}) => {
  return (
    <InputContainer withIcon={!!icon}>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
        onInvalid={e => e.preventDefault()}
      />
      {icon}
      {children}
      <InputAlert>{errorMessage}</InputAlert>
    </InputContainer>
  );
};
