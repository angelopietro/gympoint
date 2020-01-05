import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';

import UserHeader from '~/components/UserHeader';
import Background from '~/components/Background';

import { Container, ButtonSubmit, TextInput } from './styles';

import api from '~/services/api';

export default function New({ navigation }) {
  const { student_id } = useSelector(state => state.auth.user);

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    try {
      await api.post(`/students/${student_id}/help-orders`, {
        question,
      });

      navigation.navigate('Help');
    } catch (error) {
      if (error) {
        Alert.alert('Error', error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Background>
      <Container>
        <UserHeader />
        <TextInput
          autoCapitalize="none"
          keyboardType="default"
          autoCorrect={false}
          placeholder="Inclua seu pedido de auxílio"
          onChangeText={setQuestion}
        />
        <ButtonSubmit
          onPress={handleSubmit}
          enabled={question.length > 0}
          loading={loading}
        >
          Enviar pedido
        </ButtonSubmit>
      </Container>
    </Background>
  );
}

New.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={24} color="#000000" />
    </TouchableOpacity>
  ),
});

New.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
