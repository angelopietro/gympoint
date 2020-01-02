import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 15px 10px;
`;

export const HelpList = styled.FlatList.attrs({
  showVerticalScrollIndicator: true,
  contentContainerStyle: { paddingTop: 20 },
})``;

export const Card = styled(RectButton)`
  margin-top: 15px;
  background: #fff;
  border-radius: 4px;
`;

export const CardView = styled.View`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CardInfo = styled.View`
  flex-direction: row;
`;

export const InfoIcon = styled(Icon)`
  color: ${props => (props.answered ? '#42CB59' : '#999999')};
`;

export const InfoText = styled.Text.attrs({
  numberOfLines: 3,
})`
  margin-left: 5px;
  font-weight: bold;
  color: ${props => (props.answered ? '#42CB59' : '#999999')};
`;

export const InfoDate = styled.Text``;

export const QuestionBody = styled.View`
  padding-top: 10px;
`;

export const QuestionText = styled.Text`
  font-size: 14px;
  color: #666666;
  line-height: 26px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#ee4e62',
  size: 'small',
})`
  margin: 30px 0;
`;
