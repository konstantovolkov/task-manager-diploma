import { useState, ChangeEvent, FormEvent } from 'react';
import { IFormState } from '../types/IFormState';
import { IFormSubmitAction } from '../types/IFormSubmitAction';

export const useForm = (formSubmitHandler: IFormSubmitAction) => {
  const [inputs, setInputs] = useState<IFormState>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formSubmitHandler(inputs);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();

    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value
    }));
  };

  const reset = () => {
    setInputs({});
  };

  return {
    inputs,
    handleSubmit,
    handleInputChange,
    reset
  };
};
