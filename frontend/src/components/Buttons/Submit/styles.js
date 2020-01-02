import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Button = styled.button`
  height: 36px;
  display: flex;
  align-self: ${props => (props.block === true ? 'stretch' : 'unset')};
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  border: none;
  background: ${colors.primary};
  transition: background 0.2s ease;

  &:hover {
    background: ${darken(0.1, colors.primary)};
  }
`;
