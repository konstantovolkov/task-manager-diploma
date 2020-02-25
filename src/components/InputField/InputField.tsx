import React from 'react';
import { InputContainer } from './InputContainer';
import { IFieldProps } from '../../types/IFieldProps';

export const InputField: React.FC<IFieldProps> = ({
  type,
  name,
  placeholder,
  onChange,
  value,
  icon,
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
      />
      <>
        {icon}
        {children}
      </>
    </InputContainer>
  );
};
