import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getPostsByHashtag } from "../../service/api.service";
import UserContext from "../../contexts/UserContext";
import TimelinePost from "../../components/TimelinePost";
import { VscLoading } from "react-icons/vsc";
import styled from "styled-components";
import { colors } from "../../globalStyles";
import Trending from "../../components/Trending";

export default function Hashtag() {
  const { hashtag } = useParams();
  const { userData } = useContext(UserContext);
  const [hashtagPosts, setHashtagPosts] = useState({});

  useEffect(() => {
    getPostsByHashtag({ token: userData.token }, hashtag).then((r) =>
      setHashtagPosts(r.data)
    );
  }, [hashtag]);

  return (
    <>
      <Main>
        <Title># {hashtag}</Title>
        {hashtagPosts.posts ? (
          hashtagPosts.posts.map((post, index) => (
            <TimelinePost key={index} {...post} />
          ))
        ) : (
          <Container>
            <Loader />
            <LoaderText>Carregando...</LoaderText>
          </Container>
        )}
      </Main>
      <Trending />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 43px;
  margin-top: 125px;
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
