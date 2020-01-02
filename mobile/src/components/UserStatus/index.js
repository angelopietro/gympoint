import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { useSelector } from 'react-redux';

/* -----STYLES----- */
import { MessageStatus, MessageContent, MessageText } from './styles';

/* -----UTIL----- */
import { customFormatDate } from '~/util/format';

export default function Duration() {
  const { start_date, end_date } = useSelector(state => state.auth.user);

  return (
    <MessageStatus>
      <MessageContent>
        <Icon name="message1" size={28} color="#ee4e62" />
        <MessageText>
          Caro aluno, a sua matrícula ainda não está liberada para realizar
          checkin. A liberação irá ocorrer {customFormatDate(start_date)}.
        </MessageText>
      </MessageContent>
    </MessageStatus>
  );
}
