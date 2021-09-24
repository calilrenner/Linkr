import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { getUserPosts } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import Post from "../components/Post";
import { Main, Title, Loader, Text } from "./mainStyles";
import SearchUser from "../components/SearchUser";
import { useHistory } from "react-router-dom";

export default function MyPosts() {
  const { userData, setUserData, onChangePost } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [load, setLoad] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!userData.token) {
      history.push("/");
    }
    getUserPosts(userData.id, { token: userData.token }).then((res) => {
      setUserPosts(res.data.posts);
      setLoad(true);
    });
  }, [onChangePost]);

  return (
    <Main>
      <div>
        <Header />
        {window.innerWidth < 1000 && <SearchUser />}
        <Title>my posts</Title>
        {load ? (
          userPosts.length === 0 ? (
            <Text>Você ainda não postou nada ☹️</Text>
          ) : (
            userPosts.map((u, i) => <Post key={i} {...u} />)
          )
        ) : (
          <Container>
            <Loader />
          </Container>
        )}
      </div>
      <Trending />
    </Main>
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
