import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  background: #ee4e62;
  border-radius: 4px;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
`;
