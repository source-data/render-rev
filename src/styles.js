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

  button.link {
    background: none !important;
    border: none;
    padding: 0 !important;
    /*input has OS specific font-family*/
    color: #069;
    text-decoration: underline;
    cursor: pointer;
  }
`;
