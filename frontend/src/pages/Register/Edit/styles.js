import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 30px;
  max-width: 900px;
  margin: auto;

  .react-select__control {
    height: 45px;
    width: 100%;
    padding: 0 10px;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0;

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

  div {
    flex-basis: 25%;
  }

  input {
    width: 100%;
    height: 45px;
    padding: 0 10px;
  }
`;

export const Column = styled.div`
  margin-left: 20px;
  :first-of-type {
    margin-left: 0;
  }
  .react-select__control {
    width: 200px;
  }
`;

export const Buttons = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  max-width: 225px;
`;
