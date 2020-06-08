import styled from 'styled-components';

export const StyledFormToggler = styled.div`
  display: flex;
  justify-content: stretch;
  height: 55px;
  & > :first-child {
    border-top-left-radius: 5px;
  }
  & > :last-child {
    border-top-right-radius: 5px;
  }
`;
