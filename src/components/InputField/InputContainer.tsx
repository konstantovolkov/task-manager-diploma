import styled from 'styled-components';

const getAlignment = (
  iconOffset: number,
  defaultOffset: number = 0
) => (props: { withIcon: boolean }) =>
  `${props.withIcon ? iconOffset : defaultOffset}px`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  position: relative;
  font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans,
    Helvetica Neue, Arial, sans-serif;

  & svg {
    position: absolute;
    left: ${getAlignment(13)};
    transform: translateY(-50%);
    top: 50%;
  }

  & span {
    position: absolute;
    right: ${getAlignment(13)};
    transform: translateY(-50%);
    top: 50%;
    cursor: pointer;

    &::before {
      content: ' ';
      border-style: solid;
      border-width: 0 0 0 1px;
      border-color: #c7c9c9;
      padding-right: ${getAlignment(13)};
    }
  }

  & input {
    height: -webkit-fill-available;
    border: #c7c9c9 solid 1px;
    border-radius: 3px;
    outline: none;
    padding-left: ${getAlignment(35, 10)};
    font-size: 13px;
  }
`;
