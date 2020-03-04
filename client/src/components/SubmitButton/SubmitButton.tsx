import React from 'react';
import { StyledSubmitButton } from './StyledSubmitButton';

interface ISubmitButtonProps {
  children: string;
}

export const SubmitButton: React.FC<ISubmitButtonProps> = ({ children }) => {
  return <StyledSubmitButton type="submit">{children}</StyledSubmitButton>;
};
