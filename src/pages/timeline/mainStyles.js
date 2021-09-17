import styled from "styled-components";
import { colors } from "../../globalStyles";
import { VscLoading } from "react-icons/vsc";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 43px;
  font-weight: bold;
  margin-top: 140px;
  color: ${colors.white};
  font-family: "Oswald", sans-serif;
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
const ErrorMsg = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const PostCreation = styled.div`
  width: 611px;
  height: 209px;
  border-radius: 16px;
  background-color: ${colors.white};
  margin-top: 43px;

  @media (max-width: 1000px) {
    border-radius: 0;
    width: 100vw;
  }
`;

export { Container, Title, Main, Loader, LoaderText, ErrorMsg, PostCreation };
