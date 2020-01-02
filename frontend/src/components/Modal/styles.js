import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
`;

export const Content = styled.div`
  width: ${props => (props.size ? props.size : 650)}px;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  padding: 40px;
  background: ${colors.white};
`;
