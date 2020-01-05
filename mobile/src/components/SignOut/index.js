import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container } from './styles';

export default function SignOut() {
  const dispatch = useDispatch();

  function handleSignOut() {
    Alert.alert('Confirmação de saida', 'Você realmente deseja sair?', [
      {
        text: 'SIM',
        onPress: () => {
          dispatch(signOut());
        },
      },
      { text: 'NÃO' },
    ]);
  }
  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          handleSignOut();
        }}
      >
        <Icon name="logout" size={20} color="#444" />
      </TouchableOpacity>
    </Container>
  );
}
