import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  padding: 0 30px;
  max-width: 1200px;
  margin: auto;

  table {
    td {
      text-align: center;
      &:nth-child(2) {
        text-align: left;
      }

      &:nth-child(6) svg {
        margin: auto;
      }
    }
  }
`;

export const SectionHeader = styled.div`
  width: 100%;
  height: 64px;
  margin: 30px auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ButtonDelete = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  color: ${colors.primary};
  background: transparent;
`;

export const PageActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 10px auto 0;
  width: 100%;
  border-radius: 0.4rem;
  padding: 20px;
`;
