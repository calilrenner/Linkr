import { useEffect, useState, useContext, useRef, useCallback } from "react";
import Post from "../components/Post";
import UserContext from "../contexts/UserContext";
import { getPosts } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import CreateNewPost from "../components/CreateNewPost";
import axios from "axios";
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
            <CreateNewPost timelinePosts={timelinePosts} />
            {posts.map((post, index) => {
                if(posts.length === index + 1) {
                  return <div ref={lastPostRef} key={post.id}><Post {...post}/></div>
                } else {
                  return <Post key={post} {...post}/>
                }
              }
            )}
          </div>
          <Trending />
        </Main>
      );
    }
  }

  return <>{loadPosts()}</>;
}
