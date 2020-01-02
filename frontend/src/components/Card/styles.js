import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div``;

export const CardBox = styled.div`
  width: 100%;
  background-color: ${colors.white};
  margin: 0 auto;
  display: flex;
  align-items: left;
  flex-direction: column;
  border-radius: 0.4rem;
  padding: 30px;

  /* mensagem de erro */
  span {
    color: ${colors.primary};
    align-self: flex-start;
    margin: -15px 0 10px 0;
    font-size: 12px;
  }
`;
