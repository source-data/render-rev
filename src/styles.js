import { css } from 'lit';

export const GlobalStyles = css`
  button {
    all: unset;
    cursor: pointer;
  }
  button:focus,
  button:hover {
    filter: invert(50%);
  }
`;
