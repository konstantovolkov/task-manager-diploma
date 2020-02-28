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
  const [inputs, setInputs] = useState<IFormState>({});
  const [errors, setErrors] = useState<{ [inputName: string]: string }>({});
  const [submit, setSubmit] = useState<boolean>(false);

  useEffect(() => {
    setErrors(getErrors(inputs));
  }, [inputs, getErrors]);

  useEffect(() => {
    if (!Object.keys(errors).length && submit) {
      formSubmitHandler(inputs);
    }
    setSubmit(false);
  }, [errors])


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setInputs(inputs => ({
      ...inputs,
      ...Object.assign({}, ...inputNames.filter(inputName => !inputs[inputName]).map(inputName => ({ [inputName]: '' })))
    }));
    setSubmit(true);
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
