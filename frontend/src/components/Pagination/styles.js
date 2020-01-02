import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;

  & span {
    padding: 10px;
    margin: 3px;
    color: ${colors.gray500};
    a {
      font-size: 14px;
      color: ${colors.primary};
    }
    a.disabled {
      color: ${colors.gray300};
    }
  }
`;
