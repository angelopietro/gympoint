import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 30px;
  max-width: 900px;
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

export const SectionHeader = styled.div`
  width: 100%;
  height: 64px;
  margin: 30px auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    width: 32.5%;
  }
`;

export const Buttons = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  max-width: 225px;
`;
