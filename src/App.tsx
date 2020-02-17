import React from 'react';
import { AuthForm } from './components/AuthForm';
import { IconType, InputType } from './types/enums';
import { TFormTypesRecord } from './types/TFormTypesRecord';

const formConfig: TFormTypesRecord = {
  'Sign in': {
    inputs: [
      {
        key: 1,
        type: InputType.TEXT,
        placeholder: 'Your usernamе',
        name: 'username',
        icon: IconType.USER
      },
      {
        key: 2,
        type: InputType.PASSWORD,
        placeholder: 'Your password',
        name: 'password',
        icon: IconType.PASSWORD
      }
    ]
  },
  'New account': {
    inputs: [
      {
        key: 1,
        type: InputType.TEXT,
        placeholder: 'Your username',
        name: 'username',
        icon: IconType.USER
      },
      {
        key: 2,
        type: InputType.EMAIL,
        placeholder: 'Your e-mail',
        name: 'email',
        icon: IconType.EMAIL
      },
      {
        key: 3,
        type: InputType.PASSWORD,
        placeholder: 'Your password',
        name: 'password',
        icon: IconType.PASSWORD
      }
    ]
  }
};

const App: React.FC = () => {
  return <AuthForm formConfig={formConfig} />;
};

export default App;
