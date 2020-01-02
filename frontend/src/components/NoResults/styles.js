import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  svg {
    font-size: 56px;
    color: ${colors.gray400};
  }
`;
export const Message = styled.div`
  font-size: 14px;
  color: ${colors.gray400};
`;
