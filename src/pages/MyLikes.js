import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { getMyLikes } from "../service/api.service";
import UserContext from "../contexts/UserContext";
import Post from "../components/Post";
import Trending from "../components/Trending";
import Header from "../components/Header";
import { Loader, Main, Title, Text } from "./mainStyles";
import SearchUser from "../components/SearchUser";
import { useHistory } from "react-router-dom";

export default function MyLikes() {
  const { userData, onChangePost } = useContext(UserContext);
  const [likedPosts, setLikedPosts] = useState({});
  const [load, setLoad] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (!userData.token) {
      history.push("/");
    }
    getMyLikes({ token: userData.token }).then((r) => {
      setLikedPosts(r.data.posts);
      setLoad(true);
    });
  }, [onChangePost]);
  return (
    <>
      <Header />
      <Main>
        {window.innerWidth < 1000 && <SearchUser />}
        <Title>my likes</Title>
        {load ? (
          likedPosts.length === 0 ? (
            <Text>Você ainda não curtiu nada ☹️</Text>
          ) : (
            likedPosts.map((post, index) => <Post key={index} {...post} />)
          )
        ) : (
          <Container>
            <Loader />
          </Container>
        )}
      </Main>
      <Trending />
    </>
  );
}

const Container = styled.div`
  margin: 0 150px;

  @media (max-width: 1000px) {
    display: flex;
    justify-content: center;
    margin-top: -150px;
  }
`;
