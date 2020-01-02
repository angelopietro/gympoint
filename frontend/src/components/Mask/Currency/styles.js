import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 200px;
`;

export const Prefix = styled.span`
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  height: 45px;
  color: ${colors.gray500};
  text-align: center;
  background-color: ${colors.gray300};
  border: 1px solid ${colors.secondary};

  white-space: nowrap;
  vertical-align: middle;
  display: table-cell;
  border-right: 0;
  border-radius: 4px 0px 0px 4px;
`;
