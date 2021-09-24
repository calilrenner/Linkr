import { useEffect, useState, useContext, useRef, useCallback } from "react";
import Post from "../components/Post";
import UserContext from "../contexts/UserContext";
import { getPosts } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import CreateNewPost from "../components/CreateNewPost";
import InfiniteScroll from 'react-infinite-scroller';
import { loadMorePosts } from "../service/scrollApi.service";
import SearchUser from "../components/SearchUser";
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
  const [firstPostId, setFirstPostId] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [newPosts, setNewPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  function postRepost(post) {
    if(post.repostId) {
      return post.repostId;
    } else {
      return post.id;
    }
  }

  useEffect(() => {
    getPosts(userData.token)
      .then((res) => {
        setPosts(res.data.posts);
        setTrasnfer(!trasnfer);
      })
      .catch((err) =>
        SetErrPosts(
          "Houve uma falha ao obter os posts, por favor atualize a página"
        )
      )
  }, [onChangePost]);

  useEffect(() => {
    if(posts.length > 0) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  }, [posts])

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
    }
  }, [postsIds, posts])

  function scrollInfinity() {
    loadMorePosts(firstPostId, userData.token).then(r => {
      setNewPosts([...r.data.posts])
      setHasMore(newPosts.length > 0)
      setPosts([...posts, ...newPosts]);
    })
  }

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
            {window.innerWidth < 1000 && <SearchUser />}
            <Title>timeline</Title>
            <CreateNewPost />
            <InfiniteScroll
              pageStart={0}
              loadMore={scrollInfinity}
              hasMore={hasMore}
              loader={<LoaderText key={0}>Loading ...</LoaderText>}
        >
            {posts.map((post, index) => (
            <Post key={post.id} {...post} />))}
        </InfiniteScroll>
          </div>
          <Trending />
        </Main>
      );
    }
  }

  return <>{loadPosts()}</>;
}
