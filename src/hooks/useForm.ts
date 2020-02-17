import { useState, ChangeEvent, FormEvent } from 'react';

interface IFormState {
  [inputName: string]: string | number;
}

interface IFormStateHandler {
  (formState: IFormState): void;
}

export const useForm = (formSubmitHandler: IFormStateHandler) => {
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
