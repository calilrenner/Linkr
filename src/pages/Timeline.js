import { useEffect, useState, useContext } from "react";
import Post from "../components/Post";
import UserContext from "../contexts/UserContext";
import { getFollowsPosts, getFollows } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import CreateNewPost from "../components/CreateNewPost";
import styled from "styled-components";
import { colors } from "../globalStyles";
import SearchUser from "../components/SearchUser";
import {
  Container,
  Loader,
  LoaderText,
  Main,
  Title,
} from "./mainStyles";

export default function Timeline() {
  const { userData, onChangePost } = useContext(UserContext);
  const [followedPosts, setFollowedPosts] = useState("");
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => 
  {
    getFollows(userData.token).then(r => setFollowedUsers(r.data.users))
    getFollowsPosts(userData.token).then(r => setFollowedPosts(r.data.posts));
  }
  ,[onChangePost])

  function returnPosts() {
    if(followedUsers.length === 0) {
      return (
        <NoFollow>Você não segue ninguém ainda, procure por perfis na busca.</NoFollow>
      ) 
      }else if(followedPosts.length === 0) {
        return (
        <NoFollow>Nenhuma publicação encontrada.</NoFollow>
        )
      } else {
        return (
          <>
          {followedPosts.map((post) => <Post key={post.id} {...post} />)}
          </>
        )
      }
    }

  function loadPosts() {
    if (followedPosts === "") {
      return (
        <Container>
          <Loader />
          <LoaderText>Carregando...</LoaderText>
        </Container>
      );
    }  else {
      return (
        <Main>
          <div>
            <Header />
            {window.innerWidth < 1000 && <SearchUser />}
            <Title>timeline</Title>
            <CreateNewPost />
            {returnPosts()}
          </div>
          <Trending />
        </Main>
      );
    }
  }

  return <>{loadPosts()}</>;
}

const NoFollow = styled.div`
  font-weight: bold;
  font-size: 43px;
  color: #fff;
  width: 611px;
  margin-top: 50px;
  background-color: ${colors.black};
  border-radius: 16px;
  height: 147px;
  display: flex;
  align-items: center;
  padding: 15px;
  
  @media (max-width: 1000px) {
    width: 100%;
    border-radius: 0;
  }
`