import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* -----COMPONENTS----- */
import Background from '~/components/Background';

/* -----STYLES----- */
import {
  Container,
  CardDetail,
  CardHeader,
  Title,
  Date,
  Text,
  CardDiv,
} from './styles';

export default function Detail({ navigation }) {
  const help = navigation.getParam('help');

  return (
    <Background>
      <Container>
        <CardDetail>
          <CardHeader>
            <Title>Pergunta</Title>
            <Date>{help.created_at}</Date>
          </CardHeader>

          <Text>{help.question}</Text>

          <CardDiv />

          <CardHeader>
            <Title>Resposta</Title>
            <Date>{help.answered_at}</Date>
          </CardHeader>

          <Text>{help.answer}</Text>
        </CardDetail>
      </Container>
    </Background>
  );
}

Detail.navigationOptions = ({ navigation }) => ({
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

Detail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
