import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getPostsByHashtag } from "../service/api.service";
import UserContext from "../contexts/UserContext";
import Post from "../components/Post";
import Trending from "../components/Trending";
import Header from "../components/Header";
import { Main, Title, Container, Loader, LoaderText, Text } from "./mainStyles";
import SearchUser from "../components/SearchUser";

export default function Hashtag() {
  const { hashtag } = useParams();
  const { userData } = useContext(UserContext);
  const [hashtagPosts, setHashtagPosts] = useState({});
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getPostsByHashtag({ token: userData.token }, hashtag).then((r) => {
      setHashtagPosts(r.data);
      setLoad(true);
    });
  }, [hashtag, userData.token]);

  return (
    <>
      <Header />
      <Main>
        {window.innerWidth < 1000 && <SearchUser />}
        <Title># {hashtag}</Title>
        {load ? (
          hashtagPosts.posts.length === 0 ? (
            <Text>Nada sobre esse assunto ☹️</Text>
          ) : (
            hashtagPosts.posts.map((post, index) => (
              <Post key={index} {...post} />
            ))
          )
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
