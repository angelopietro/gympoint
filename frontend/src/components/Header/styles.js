import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  background-color: ${colors.white};
  max-width: 1440px;
  height: 64px;
  border: solid 1px ${colors.gray300};
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      max-height: 64px;
      margin-left: 3em;
      max-height: 32px;
    }

    ul {
      display: flex;
      justify-content: space-between;
      list-style: none;
      margin: 20px 0;

      & li {
        margin-right: 30px;
      }
    }
  }

  aside {
    display: flex;
    align-items: space-between;
  }

  a {
    display: block;
    margin-top: 0.125rem;
    font-size: 0.825rem;
    color: #999;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: bold;
    position: relative;
  }

  a:hover,
  .active {
    color: ${colors.gray600};
  }
`;

export const Line = styled.div`
  width: 1px;
  height: 32px;
  background: ${colors.gray300};
  margin: 0px 45px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.gray500};
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  margin-right: 25px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: ${colors.gray700};
    }

    a {
      color: ${colors.primary};
      font-size: 14px;
      font-weight: 400;
      text-transform: lowercase;
      font-weight: normal;
    }
  }
`;

export const ButtonLogout = styled.button`
  border: 0;
  background: transparent;
  color: ${colors.primary};
  cursor: 'pointer';
  margin-top: 5px;
  font-size: 12px;
`;
