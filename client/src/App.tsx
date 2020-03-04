import React from 'react';
import { AuthForm } from './components/AuthForm/AuthForm';
import { IconType, InputType } from './types/enums';
import { TFormTypesRecord } from './types/TFormTypesRecord';
import { IFormState } from './types/IFormState';

const check = (isValid: (value: string) => boolean) => (value: string) =>
  isValid(value);

const formConfig: TFormTypesRecord = {
  'Sign in': {
    inputs: [
      {
        type: InputType.TEXT,
        placeholder: 'Usernamе',
        name: 'username',
        icon: IconType.USER
      },
      {
        type: InputType.PASSWORD,
        placeholder: 'Password',
        name: 'password',
        icon: IconType.PASSWORD
      }
    ],
    submitAction: (inputData: IFormState) => {
      alert(`User signed in:
        Username: ${inputData.username}
        Password: ${inputData.password}`);
    },
    submitButtonText: 'Sign in',
    validators: {
      password: [
        {
          isValid: check(value => value.length > 0),
          errorMessage: 'Password is required'
        }
      ],
      username: [
        {
          isValid: check(value => value.length > 0),
          errorMessage: 'Username is required'
        }
      ]
    }
  },
  'New account': {
    inputs: [
      {
        type: InputType.TEXT,
        placeholder: 'Username',
        name: 'username',
        icon: IconType.USER
      },
      {
        type: InputType.TEXT,
        placeholder: 'E-mail',
        name: 'email',
        icon: IconType.EMAIL
      },
      {
        type: InputType.PASSWORD,
        placeholder: 'Password',
        name: 'password',
        icon: IconType.PASSWORD
      }
    ],
    submitAction: (inputData: IFormState) => {
      alert(`User registered:
        Username: ${inputData.username}
        Email: ${inputData.email}
        Password: ${inputData.password}`);
    },
    submitButtonText: 'Create account',
    validators: {
      password: [
        {
          isValid: check(value => value.length > 0),
          errorMessage: 'Password is required'
        },
        {
          isValid: check(value => value.length > 6),
          errorMessage: "Password's length must be more than 6"
        }
      ],
      username: [
        {
          isValid: check(value => value.length > 0),
          errorMessage: 'Username is required'
        },
        {
          isValid: check(value => value.length < 15),
          errorMessage: 'Username must be shorter than 15'
        }
      ],
      email: [
        {
          isValid: check(value => {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value);
          }),
          errorMessage: 'Email should match the pattern: example@mail.com'
        },
        {
          isValid: check(value => value.length > 0),
          errorMessage: 'Email is required'
        }
      ]
    }
  }
};

const App: React.FC = () => {
  return <AuthForm formConfig={formConfig} />;
};

export default App;
