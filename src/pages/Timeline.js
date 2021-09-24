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

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const observer = useRef();
  function setConfig() {
    return { headers: { Authorization: `Bearer ${userData.token}` } };
  }

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
        setPageNumber(prevPageNumber => prevPageNumber + 1)
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

  const lastPostRef = useCallback(node => {
    if(observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting) {
          setPosts("");
          axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts?olderThan=${firstPostId}`, setConfig())
            .then(res => {
              setPosts([...posts, ...res.data.posts])
              setPageNumber(prevPageNumber => prevPageNumber + 1)
            })
        }
      })
      if(node) observer.current.observe(node)
  }, [loading, hasMore, lastPostId, firstPostId]);

  console.log(posts)

  function loadPosts() {
    if (errPosts !== "") {
      return <ErrorMsg>{errPosts}</ErrorMsg>;
    }
    if (posts === "" && pageNumber === 0) {
      return (
        <Container>
          <Loader />
          <LoaderText>Carregando...</LoaderText>
        </Container>
      );
    } else if (posts.length === 0 && pageNumber === 0) {
      return <ErrorMsg>Nenhum post encontrado</ErrorMsg>;
    } else {
      return (
        <Main>
          <div>
            <Header />
            <Title>timeline</Title>
            <CreateNewPost />
            {posts.length > 0 && posts.map((post, index) => {
                if(posts.length === index + 1) {
                  return (
                    <div ref={lastPostRef} key={post.id}><Post {...post}/></div>
                  )
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
