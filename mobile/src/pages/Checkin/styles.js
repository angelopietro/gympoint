import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
  padding: 15px 10px;
`;

export const CheckInList = styled.FlatList.attrs({
  showVerticalScrollIndicator: true,
  contentContainerStyle: { paddingTop: 20 },
})``;

export const CheckInItem = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  height: 50px;
  padding: 10px;
  margin-top: 10px;
`;

export const CheckInTitle = styled.Text`
  font-size: 14px;
  color: #444444;
  font-weight: bold;
`;

export const CheckInDate = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const ButtonSubmit = styled(Button)`
  opacity: ${props => (props.enabled ? 1 : 0.5)};
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#ee4e62',
  size: 'small',
})`
  margin: 30px 0;
`;
