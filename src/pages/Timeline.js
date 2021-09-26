import { useEffect, useState, useContext, useRef } from "react";
import Post from "../components/Post";
import UserContext from "../contexts/UserContext";
import { getFollowsPosts, getFollows } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import CreateNewPost from "../components/CreateNewPost";
import axios from "axios";
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
  const [posts, setPosts] = useState("");
  const [errPosts, SetErrPosts] = useState("");
  const { userData, onChangePost, setOnChangePost } = useContext(UserContext);
  const [postsIds, setPostsIds] = useState([]);
  const [trasnfer, setTrasnfer] = useState(false)
  let higher = Number.POSITIVE_INFINITY;
  let lower = Number.NEGATIVE_INFINITY;
  const [lastPostId, setLastPostId] = useState(0);
  const [firstPostId, setFirstPostId] = useState(0);

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();
  function setConfig() {
    return { headers: { Authorization: `Bearer ${userData.token}` } };
  }

  const lastPostRef = useCallback(node => {
    if(observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting) {

          axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/following/posts', setConfig())
            .then(res => console.log(res.data))
          console.log(lastPostId, firstPostId)
    
        }
      })
      if(node) observer.current.observe(node)
  }, [loading, hasMore]);

  function postRepost(post) {
    if(post.repostId) {
      return post.repostId;
    } else {
      return post.id;
    }
  }

  useEffect(() => {
    timelinePosts();
  }, [onChangePost]);

  function timelinePosts() {
    getPosts(userData.token)
      .then((res) => {
        setPosts(res.data.posts);
        setTrasnfer(!trasnfer);
      })
      .catch((err) =>
        SetErrPosts(
          "Houve uma falha ao obter os posts, por favor atualize a página"
        )
      );
  }

  useEffect(() => {
    if(posts.length > 0) {
        setPostsIds(posts.map(post => postRepost(post)));
    }
  }, [posts, trasnfer])

  useEffect(() => {
    if(postsIds.length !== 0) {
      postsIds.forEach(id => {
        if(id < higher) {
          higher = id;
          setFirstPostId(higher);
        }
      })
    };
    if(postsIds.length !== 0) {
      postsIds.forEach(id => {
        if(id > lower) {
          lower = id;
          setLastPostId(lower);
        }
      })
    }
  }, [postsIds, posts])

  console.log(lastPostId, firstPostId)

  function loadPosts() {
    if (errPosts !== "") {
      return <ErrorMsg>{errPosts}</ErrorMsg>;
  const { userData, onChangePost, setOnChangePost } = useContext(UserContext);
  const [followedPosts, setFollowedPosts] = useState("");
  const [followedUsers, setFollowedUsers] = useState([]);

  const useInterval = (callBackFunction, delay) => {
    const savedCallBackFunction = useRef();

    useEffect(() => {
      savedCallBackFunction.current = callBackFunction;
    }, [callBackFunction])

    useEffect(() => {
      const newQueuePosts = () => {
        savedCallBackFunction.current();
      }
      if(delay !== null) {
        let update = setInterval(newQueuePosts, delay);
        return () => clearInterval(update);
      }
    }, [delay])
  }

  useInterval(() => {
    setOnChangePost(!onChangePost)
  }, 15000);

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