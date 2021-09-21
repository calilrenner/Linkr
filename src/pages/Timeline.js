import { useEffect, useState, useContext } from "react";
import Post from "../components/Post";
import UserContext from "../contexts/UserContext";
import { getFollowsPosts, getPosts, getFollows } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import CreateNewPost from "../components/CreateNewPost";
import styled from "styled-components";
import { colors } from "../globalStyles";
import {
  ErrorMsg,
  Container,
  Loader,
  LoaderText,
  Main,
  Title,
} from "./mainStyles";

export default function Timeline() {
  const [posts, setPosts] = useState("");
  const [errPosts, SetErrPosts] = useState("");
  const { userData, onChangePost, setOnChangePost } = useContext(UserContext);
  const [followedPosts, setFollowedPosts] = useState([]);
  const [postsIds, setPostsIds] = useState([]);
  const [lastPostId, setLastPostId] = useState(0);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    getPosts(userData.token)
    .then((res) => 
      {
        setPosts(res.data.posts);
      })

    .catch((err) =>
      SetErrPosts(
        "Houve uma falha ao obter os posts, por favor atualize a página"
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChangePost]);



  useEffect(() =>
  {
    let num = Number.NEGATIVE_INFINITY;
    if(posts.length > 0) {
      setPostsIds([...new Set(posts.map(post => post.id))])
      postsIds.forEach(el => {
        if(el > num) {
          setLastPostId(el)
        }
      })
      }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [posts])

  useEffect(() => 
  {
    getFollows(userData.token).then(r => setFollowedUsers(r.data.users))
    getFollowsPosts(userData.token, lastPostId).then(r => setFollowedPosts(r.data.posts));
    setOnChangePost(!onChangePost);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ,[lastPostId])

  console.log(followedUsers)

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
    if (errPosts !== "") {
      return <ErrorMsg>{errPosts}</ErrorMsg>;
    }
    if (posts === "") {
      return (
        <Container>
          <Loader />
          <LoaderText>Carregando...</LoaderText>
        </Container>
      );
    } else if (posts.length === 0) {
      return <ErrorMsg>Nenhum post encontrado</ErrorMsg>;
    } else {
      return (
        <Main>
          <div>
            <Header />
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
  font-weigth: bold;
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