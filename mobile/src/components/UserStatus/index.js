import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { useSelector } from 'react-redux';

import { MessageStatus, MessageContent, MessageText } from './styles';

export default function Duration() {
  const { start_date } = useSelector(state => state.auth.user);

  return (
    <MessageStatus>
      <MessageContent>
        <Icon name="clock-alert" size={33} color="#ee4e62" />
        <MessageText>
          Caro aluno, seu check-in poderá ser realizado a partir do dia
          <Text style={{ fontWeight: 'bold' }}>
            {format(parseISO(start_date), " dd/MM/yyyy'", {
              locale: pt,
            })}
          </Text>
          , data da liberação de sua matrícula.
        </MessageText>
      </MessageContent>
    </MessageStatus>
  );
}
