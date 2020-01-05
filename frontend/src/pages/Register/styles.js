import styled from 'styled-components';
import colors from '~/styles/colors';

/* LIST */
export const Container = styled.div`
  padding: 0 30px;
  max-width: 1100px;
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

/* FORM */

export const FormContainer = styled.div`
  padding: 0 30px;
  max-width: 1100px;
  margin: auto;

  .react-select__control {
    height: 45px;
    width: 100%;
    padding: 0 10px;
  }
`;

export const FormSectionHeader = styled.div`
  width: 100%;
  height: 64px;
  margin: 30px auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormInputGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  .react-select__control {
    height: 45px;
    width: 100%;

    & .react-select__value-container {
      margin-top: -5px;
    }

    & .react-select__indicators {
      margin-top: -5px;
      margin-right: -8px;
    }
  }

  input {
    height: 45px;
    padding: 0 10px;
  }

  .react-datepicker__input-container {
    width: 225px;
  }
`;

export const FormColumn = styled.div`
  width: 23%;
`;
export const FormButtons = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  max-width: 225px;
`;
