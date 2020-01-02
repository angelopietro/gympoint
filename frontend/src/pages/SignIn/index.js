import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Gympoint" />

      <Form onSubmit={handleSubmit} schema={schema}>
        <Input name="email" type="email" placeholder="example@domain.com" />
        <Input name="password" type="password" placeholder="*********" />

        <button type="submit">
          {loading ? 'Validando dados...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}
