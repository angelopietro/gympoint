import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  flex: 1;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #dddddd;
  font-size: 16px;
  padding: 0 15px;
`;
