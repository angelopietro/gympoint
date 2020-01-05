import styled from 'styled-components';
import colors from '~/styles/colors';

/* LIST */

export const Container = styled.div`
  padding: 0 30px;
  max-width: 1100px;
  margin: auto;

  tr {
    & :nth-child(4) {
      text-align: center;
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
  width: 400px;
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

/* FORMS */

export const FormContainer = styled.div`
  padding: 0 30px;
  max-width: 1100px;
  margin: auto;

  form {
    & input {
      margin-bottom: 20px;
      width: 100%;
      height: 45px;
      padding: 0 10px;
    }
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
  display: flex;
  justify-content: space-between;

  div {
    width: 32.5%;
  }
`;

export const FormButtons = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  max-width: 225px;
`;
