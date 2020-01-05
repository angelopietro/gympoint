import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSelector } from 'react-redux';

import { UserContent, UserInfo, UserText } from './styles';

export default function Duration() {
  const { student, plan } = useSelector(state => state.auth.user);

  return (
    <UserContent>
      <UserInfo>
        <Icon name="account" size={22} color="#999" />
        <UserText>{student.name} </UserText>
      </UserInfo>

      <UserInfo>
        <Icon name="trophy-variant-outline" size={18} color="#999" />
        <UserText>{plan.title} </UserText>
      </UserInfo>
    </UserContent>
  );
}
