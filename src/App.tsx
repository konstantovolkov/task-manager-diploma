import React from 'react';
import { AuthForm } from './components/AuthForm';
import { IconType, InputType } from './types/enums';
import { TFormTypesRecord } from './types/TFormTypesRecord';
import { IFormState } from './types/IFormState';

const formConfig: TFormTypesRecord = {
  'Sign in': {
    inputs: [
      {
        key: 1,
        type: InputType.TEXT,
        placeholder: 'Usernamе',
        name: 'username',
        icon: IconType.USER
      },
      {
        key: 2,
        type: InputType.PASSWORD,
        placeholder: 'Password',
        name: 'password',
        icon: IconType.PASSWORD
      }
    ],
    submitAction: (inputData: IFormState) => {
      alert(`User signed in:
        Username: ${inputData.name}
        Password: ${inputData.password}`);
    },
    submitButtonText: 'Sign in'
  },
  'New account': {
    inputs: [
      {
        key: 1,
        type: InputType.TEXT,
        placeholder: 'Username',
        name: 'username',
        icon: IconType.USER
      },
      {
        key: 2,
        type: InputType.EMAIL,
        placeholder: 'E-mail',
        name: 'email',
        icon: IconType.EMAIL
      },
      {
        key: 3,
        type: InputType.PASSWORD,
        placeholder: 'Password',
        name: 'password',
        icon: IconType.PASSWORD
      }
    ],
    submitAction: (inputData: IFormState) => {
      alert(`User registered:
        Username: ${inputData.name}
        Email: ${inputData.email}
        Password: ${inputData.password}`);
    },
    submitButtonText: 'Create account'
  }
};

const App: React.FC = () => {
  return <AuthForm formConfig={formConfig} />;
};

export default App;
