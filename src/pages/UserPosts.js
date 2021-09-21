import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../service/api.service";
import UserContext from "../contexts/UserContext";
import Post from "../components/Post";
import Trending from "../components/Trending";
import Header from "../components/Header";
import { Main, Title, Container, Loader, LoaderText } from "./mainStyles";
import styled from "styled-components";

export default function UserPosts() {
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(
    () =>
      getUserPosts(id, { token: userData.token }).then((r) =>
        setUserPosts(r.data.posts)
      ),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return (
    <>
      <Header />
      <Main>
        <Title>
          {userPosts.length > 0
            ? `${userPosts[0].user.username}'s posts`
            : "Carregando..."}
        </Title>
        {userPosts.length > 0 ? (
          userPosts.map((post, index) => <Post key={index} {...post} />)
        ) : (
          <Container>
            <Loader />
            <LoaderText>Carregando...</LoaderText>
          </Container>
        )}
      </Main>
      <Follow >Follow</Follow>
      <Trending />
    </>
  );
}


const Follow = styled.div`
  width: 112px;
  height: 31px;
  background: #1877F2;
  font-weight: bold;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 85px;
  right: calc((100% - 937px) / 2);
  font-size: 14px;
`
