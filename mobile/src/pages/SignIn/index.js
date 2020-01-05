import React, { useState } from 'react';
import { Alert, Image } from 'react-native';

import { useDispatch } from 'react-redux';
import * as auth from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';
import Input from '~/components/Input';
import ButtonSubmit from '~/components/Button';

import { Container, Form } from './styles';

export default function SignIn() {
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  async function handleSubmit() {
    setLoading(true);
    try {
      dispatch(auth.signInRequest(id));
    } catch (error) {
      if (error) Alert.alert('Atenção!', error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <Input
          autoCapitalize="none"
          keyboardType="numeric"
          autoCorrect={false}
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={id}
          onChangeText={setId}
        />
        <ButtonSubmit onPress={handleSubmit} enabled={!!id} loading={loading}>
          Entrar no sistema
        </ButtonSubmit>
      </Form>
    </Container>
  );
}
