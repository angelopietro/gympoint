import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  padding: 0 30px;
  max-width: 900px;
  margin: auto;
  .question {
    overflow: hidden;
    white-space: nowrap;
    max-width: 250px;

    text-overflow: ellipsis;
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
`;

export const ButtonAnswer = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  color: ${colors.info};
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

export const CardAnswer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: left;
  flex-direction: column;
  border-radius: 0.4rem;

  h1 {
    font-size: 14px;
    color: ${colors.gray600};
    margin: 10px 0 10px;
  }
  h4 {
    span {
      font-size: 14px;
      text-transform: uppercase;
      color: ${colors.primary};
    }
  }

  p {
    color: ${colors.gray500};
    line-height: 28px;
    margin: 10px 0 10px;
    font-size: 16px;
  }

  form {
    .textArea {
      flex: 1;
      border: 1px solid ${colors.gray300};
      padding: 10px 15px;
      border-radius: 0.4rem;
      font-size: 14px;
      color: ${colors.gray400};
      transition: border 0.55s ease;
      width: 100%;
      height: 127px;
      resize: none;
    }

    input:focus {
      border-color: ${colors.gray300};
    }

    span {
      font-size: 14px;
      color: ${colors.primary};
    }
  }
`;

export const AnswerButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: ${colors.primary};
  border-radius: 0.4rem;
  font-weight: bold;
  font-size: 15px;
  color: ${colors.white};
  margin: 10px 0 10px;
  height: 45px;
  letter-spacing: 0.03rem;
`;
