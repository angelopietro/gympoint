import styled from 'styled-components';
import colors from '~/styles/colors';

export const SearchInput = styled.div`
  position: relative;

  input {
    width: 237px;
    height: 40px;
    padding: 0 45px;
  }

  button {
    position: absolute;
    top: 10px;
    left: 15px;
    color: ${colors.gray400};
    font-size: 18px;
    border: none;
    background-color: transparent;
  }
`;
