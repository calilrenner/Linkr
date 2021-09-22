import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { getUserPosts } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import Post from "../components/Post";
import { Main, Title, Loader } from "./mainStyles";

export default function MyPosts() {
  const { userData, onChangePost } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const id = userData.user.id;
    const token = { token: userData.token };
    const req = getUserPosts(id, token);

    req.then((res) => {
      setUserPosts(res.data.posts)
      setLoad(true)
    });
  }, [onChangePost]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Main>
      <div>
        <Header />
        <Title>my posts</Title>
        {load ? 
          (userPosts.length === 0 ?
            <Title>
              Você ainda não curtiu nada ☹️
            </Title>
            :
            userPosts.map((u, i) => (
              <Post key={i} {...u} />
            ))
          )
          :
          <Container>
            <Loader />
          </Container>
        }
      </div>
      <Trending />
    </Main>
  );
}

const Container = styled.div`
  margin: 0 150px;
`;
