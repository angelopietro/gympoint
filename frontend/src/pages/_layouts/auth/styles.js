import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background-color: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  text-align: center;
  max-width: 360px;
  min-height: 380px;
  background-color: #fff;
  border-radius: 0.25rem;
  -webkit-box-shadow: 0px 0px 15px -5px #0000;
  box-shadow: 0px 0px 15px -5px #0000;
  padding: 35px 35px 0 35px;
  text-align: center;
  margin: auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(255, 255, 255, 1);
      border: 1px solid #ddd;
      border-radius: 0.25rem;
      height: 2.5rem;
      padding: 1.4rem;
      color: #999999;
      margin: 0 0 0.75rem;
      font-size: 16px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.6);
      }
    }

    /* mensagem de erro de Unform para um input */
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-size: 12px;
    }

    button {
      padding: 1rem;
      border: 0;
      border-radius: 0.25rem;
      font-weight: bold;
      color: #fff;
      text-align: center;
      background-color: #ee4d64;
      margin-bottom: 10px;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
