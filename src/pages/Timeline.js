import { useEffect, useState, useContext, useRef, useCallback } from "react";
import Post from "../components/Post";
import UserContext from "../contexts/UserContext";
import { getPosts } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import CreateNewPost from "../components/CreateNewPost";
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

  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();
  const lastPostRef = useCallback(node => {
    if(observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting) console.log(node)
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
        // setPostsIds(res.data.posts.map(post => postRepost(post)));
        // console.log(postsIds);
      })
      .catch((err) =>
        SetErrPosts(
          "Houve uma falha ao obter os posts, por favor atualize a página"
        )
      );
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
