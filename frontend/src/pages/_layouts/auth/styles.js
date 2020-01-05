import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background-color: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  text-align: center;
  max-width: 360px;
  min-height: 380px;
  background-color: ${colors.white};
  border-radius: 0.25rem;
  -webkit-box-shadow: 0px 0px 15px -5px ${colors.dark};
  box-shadow: 0px 0px 15px -5px ${colors.dark};
  padding: 35px 35px 0 35px;
  text-align: center;
  margin: auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: ${colors.white};
      border: 1px solid ${colors.gray300};
      border-radius: 0.25rem;
      height: 2.5rem;
      padding: 1.4rem;
      color: ${colors.gray400};
      margin: 0 0 0.75rem;
      font-size: 16px;

      &::placeholder {
        color: ${colors.gray300};
      }
    }

    /* mensagem de erro de Unform para um input */
    span {
      color: ${colors.primary};
      align-self: flex-start;
      margin: 0 0 10px;
      font-size: 12px;
    }

    button {
      padding: 1rem;
      border: 0;
      border-radius: 0.25rem;
      font-weight: bold;
      color: ${colors.white};
      text-align: center;
      background-color: ${colors.primary};
      margin-bottom: 10px;

      &:hover {
        background: ${darken(0.03, colors.primary)};
      }
    }
  }
`;
