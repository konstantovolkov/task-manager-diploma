import React from 'react';
import { InputContainer } from './InputContainer';
import { IFieldProps } from '../types/IFieldProps';

export const InputField: React.FC<IFieldProps> = ({
  type,
  name,
  placeholder,
  onChange,
  value,
  children
}) => {
  return (
    <InputContainer withIcon={!!children}>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
      />
      {children}
    </InputContainer>
  );
};
