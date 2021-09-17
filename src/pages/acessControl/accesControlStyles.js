import styled from "styled-components";
import { colors } from "../../globalStyles";

const Container = styled.div`
  display: flex;
  @media (max-width: 614px) {
    flex-direction: column;
  }
`;

const TitleContainer = styled.div`
  height: 100vh;
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colors.white};
  background-color: ${colors.black};
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);

  h1,
  h2 {
    margin-left: 100px;
    font-weight: bold;
  }

  h1 {
    font-size: 106px;
    font-family: "Passion One", cursive;
  }
  h2 {
    font-size: 43px;
    font-family: "Oswald", sans-serif;
  }

  @media (max-width: 614px) {
    width: 100%;
    height: 175px;
    align-items: center;

    h1,
    h2 {
      margin: 0px;
    }
    h1 {
      font-size: 76px;
    }
    h2 {
      font-size: 23px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  margin: 30px auto 0 auto;
  flex-direction: column;
  justify-content: center;

  input,
  button {
    font-size: 27px;
    width: 430px;
    height: 65px;
    border-radius: 6px;
    border: 1px solid ${colors.darkGrey};
    margin-bottom: 5px;
    font-family: "Oswald", sans-serif;
    line-height: 40px;
    font-weight: bold;
  }

  input {
    padding-left: 10px;
  }

  button {
    background-color: ${colors.blue};
    color: ${colors.white};
    font-weight: bold;
  }

  a {
    color: ${colors.white};
    font-size: 20px;
    margin-top: 15px;
    text-decoration: underline;
  }
  @media (max-width: 614px) {
    input,
    button {
      font-size: 22px;
      max-width: 330px;
      height: 55px;
      border-radius: 6px;
      border: 1px solid ${colors.darkGrey};
      margin-bottom: 5px;
    }
    a {
      font-size: 17px;
    }
  }
`;

export { Container, TitleContainer, Form };
