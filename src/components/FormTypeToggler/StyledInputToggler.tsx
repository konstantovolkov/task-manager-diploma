import styled from 'styled-components';

const getColor = (checked: string, notChecked: string) => (props: {
  checked: boolean;
}) => `${props.checked ? checked : notChecked}`;

export const StyledInputToggler = styled.label`
  flex-grow: 1;
  flex-basis: 0;
  background-color: ${getColor('white', '#e1e8e7')};
  color: ${getColor('#575c5b', '#6f7a78')};
  & > input {
    display: none;
  }

  display: flex;
  justify-content: center;
  align-items: center;
`;
