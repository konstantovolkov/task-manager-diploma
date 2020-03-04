import { IFieldProps } from "../types/IFieldProps";
import React, { useState } from "react";
import { InputType } from "../types/enums";

export const withHideButton = (
  WrappedInput: React.FC<IFieldProps>
): React.FC<IFieldProps> => {
  const WithHideButton: React.FC<IFieldProps> = (props) => {
    const [hiding, setHiding] = useState<boolean>(true);

    const toggleHiding = (e: React.MouseEvent) => {
      e.preventDefault();

      setHiding(hiding => !hiding);
    }

    const propsWithCalculatedType: IFieldProps = {
      ...props,
      type: hiding? InputType.PASSWORD : InputType.TEXT
    }

    return (
      <WrappedInput {...propsWithCalculatedType}>
        <span onClick={toggleHiding}>{hiding ? 'Show' : 'Hide'}</span>
      </WrappedInput>
    )
  }

  return WithHideButton
};
