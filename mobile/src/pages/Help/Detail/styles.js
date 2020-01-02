import styled from 'styled-components/native';

export const Background = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
  padding: 15px 10px;
`;

export const Container = styled.SafeAreaView``;

export const CardDetail = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  background: #fff;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0;
`;

export const CardDiv = styled.View`
  border: 0.3px solid #666666;
  margin: 20px 0;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: #444444;
  font-weight: bold;
  text-transform: uppercase;
`;
export const Text = styled.Text`
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  text-align: left;
  margin-bottom: 8px;
  padding-bottom: 25px;
`;
export const Date = styled.Text`
  font-size: 14px;
  color: #666666;
`;
