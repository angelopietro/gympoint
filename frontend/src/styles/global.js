import { createGlobalStyle } from 'styled-components';
// import { darken } from 'polished';
import colors from './colors';

import 'antd/dist/antd.css';
import 'react-datepicker/dist/react-datepicker.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: auto ;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    font-family: "Roboto", Arial, helvetica, sans-serif;

 }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
    background: ${colors.gray100};

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  input, button {
    border-radius: 0.4rem;
  }

  input{
    border: ${colors.gray300} 1px solid;
    &::placeholder {
      color: ${colors.gray400};
    }
  }

  button {
    cursor: pointer;
  }


  h1 {
    font-size: 2rem; /*32px*/
    font-weight: 600;
    color: ${colors.gray600}
  }

  h2 {
    font-size: 1.5rem; /*24px*/
    font-weight: 600;
    color: ${colors.gray600}
  }

  h3 {
    font-size: 1.17rem; /*18.72px*/
    font-weight: 600;
    color: ${colors.gray600}
  }

  h4 {
    font-size: 1rem; /*16px*/
    font-weight: 600;
    color: ${colors.gray600}
  }

  h5 {
    font-size: .87rem; /*14px*/
    font-weight: 600;
    color: ${colors.gray600}
  }

  h6 {
    font-size: .67rem; /*10.72px*/
    font-weight: 600;
    color: ${colors.gray600}
  }

table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
    color: ${colors.gray500};

    thead {
      font-weight: bold;
      text-transform: uppercase;

      td {
        padding: 0px 10px 0 0;

        &:nth-child(4) {
          text-align: center;
        }
      }
    }

    tbody {

      tr {
        & :nth-child(4) {
          text-align: center;
        }
      }

      & tr + tr {
        border-top: 1px solid ${colors.gray200};
      }

      & tr:hover {
        border-bottom: 1px solid ${colors.gray300};
        }

      td {
        padding: 15px 10px 15px 0;

        & a + a {
          margin-left: 10px;
        }

      & div {
          display: flex;
          justify-content: space-around;

          a {
            margin: 0 30px;
          }
        }

        & :nth-child(3) {
          text-align: center;
        }

        & :last-child {
          display: flex;
          justify-content: flex-end;
          font-size: 15px;
        }

      }
    }
}

}
`;
