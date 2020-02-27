import {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback
} from 'react';
import { IFormState } from '../types/IFormState';
import { IFormSubmitAction } from '../types/IFormSubmitAction';
import { IValidator } from '../types/TFormTypesRecord';

//вернуть объект ошибок с ключом - именем поля
// если ошибки есть - аутентификации не происходит

export const useForm = (
  inputNames: string[],
  formSubmitHandler: IFormSubmitAction,
  validatorsConfig?: IValidator
) => {
  const getErrors = useCallback(
    (values: IFormState) => {
      let errors: { [inputName: string]: string } = {};

      if (validatorsConfig) {
        Object.keys(values).forEach(inputName => {
          const firstError = validatorsConfig[inputName]
            .filter(validatorObj => {
              return !validatorObj.isValid(values[inputName]);
            })
            .map(validatorObj => {
              return validatorObj.errorMessage;
            })[0];

          if (firstError) {
            errors[inputName] = firstError;
          }
        });
      }

      return errors;
    },
    [validatorsConfig]
  );
  const [inputs, setInputs] = useState<IFormState>(
    Object.assign({}, ...inputNames.map(inputName => ({ [inputName]: '' })))
  );
  const [errors, setErrors] = useState<{ [inputName: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setErrors(getErrors(inputs));
  }, [inputs, getErrors]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    formSubmitHandler(inputs);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();

    const { name, value } = e.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value.trim()
    }));
  };

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
