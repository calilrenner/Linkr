import styled from "styled-components";
import { colors } from "../globalStyles";
import { VscLoading } from "react-icons/vsc";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  max-width: 450px;
  height: 52px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 43px;
  font-weight: bold;
  margin-top: 85px;
  color: ${colors.white};
  font-family: "Oswald", sans-serif;

  @media (max-width: 1000px) {
    margin-top: 140px;
    margin-left: 20px;
    font-size: 33px;
    margin-bottom: 31px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 calc((100% - 937px) / 2);

  @media (max-width: 1000px) {
    margin: 0;
  }
`;

const Loader = styled(VscLoading)`
  height: 150px;
  width: 150px;
  animation: rotation 0.3s infinite linear;
  color: ${colors.white};
  margin-top: 200px;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

const LoaderText = styled.h1`
  animation: brink 0.3s infinite linear;
  color: ${colors.white};

  @keyframes brink {
    50% {
      opacity: 0;
    }
  }
`;

const Text = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-top: 85px;
  color: #fff;
  font-family: "Oswald", sans-serif;

  @media (max-width: 1000px) {
    font-size: 25px;
    margin-left: 20px;
  }
`;

export { Container, Title, Main, Loader, LoaderText, Text };
