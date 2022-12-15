import { css } from 'styled-components';

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 560px) {
      ${props}
    }
  `;
};

export const sm = (props) => {
  return css`
    @media only screen and (max-width: 768px) {
      ${props}
    }
  `;
};
export const md = (props) => {
  return css`
    @media only screen and (max-width: 992px) {
      ${props}
    }
  `;
};
export const lg = (props) => {
  return css`
    @media only screen and (max-width: 1200px) {
      ${props}
    }
  `;
};
