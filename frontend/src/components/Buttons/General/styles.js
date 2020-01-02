import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.4rem;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.white};
  background: ${props => colors[props.color]};
  height: 36px;
  padding: 0 16px;
  transition: 0.3s ease-in-out;

  &:hover {
    background: ${props => darken(0.2, colors[props.color])};
  }

  svg {
    margin-right: 0.3rem;
  }
`;
