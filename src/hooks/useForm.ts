import { useState, ChangeEvent, FormEvent } from 'react';
import { IFormState } from '../types/IFormState';
import { IFormSubmitAction } from '../types/IFormSubmitAction';
import { IValidator } from '../types/TFormTypesRecord';

//вернуть объект ошибок с ключом - именем поля
// если ошибки есть - аутентификации не происходит

export const useForm = (formSubmitHandler: IFormSubmitAction, validatorsConfig?: any) => {
  const [inputs, setInputs] = useState<IFormState>({});
  const [errors, setErrors] = useState<{ [inputName: string]: string }>({});
  const [validator, setValidate] = useState<IValidator>(validatorsConfig);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formSubmitHandler(inputs);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();

    const inputName = e.target.name;

    setInputs(inputs => ({
      ...inputs,
      [inputName]: e.target.value.toString()
    }));

    console.log(e.target.value)
    console.log(inputs[inputName])

    //setErrors({ username: 'loh' });

  };

  const getErrors = (values: IFormState) => {
    const errors: { [inputName: string]: string } = {};

    Object.keys(inputs).forEach(inputName => {
      if (!validator[inputName].isValid(values[inputName])) {
        errors[inputName] = validator[inputName].message;
      }
    })

    return errors;
  }

  const reset = () => {
    setInputs({});
  };

  return {
    inputs,
    errors,
    handleSubmit,
    handleInputChange,
    reset
  };
};
