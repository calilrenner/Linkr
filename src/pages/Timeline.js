import { useEffect, useState, useContext } from "react";
import Post from "../components/Post";
import UserContext from "../contexts/UserContext";
import { getFollowsPosts, getPosts } from "../service/api.service";
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
  const { userData, onChangePost } = useContext(UserContext);
  const [followsPosts, setFollowsPosts] = useState([]);
  const [postsIds, setPostsIds] = useState([]);
  const [lastPostId, setLastPostId] = useState(0);

  useEffect(() => {
    timelinePosts();
    getFollowsPosts(userData.token, lastPostId).then(r => setFollowsPosts(r.data.users));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChangePost, lastPostId]);

  function timelinePosts() {
    getPosts(userData.token)
      .then((res) => 
        setPosts(res.data.posts))

      .catch((err) =>
        SetErrPosts(
          "Houve uma falha ao obter os posts, por favor atualize a página"
        )
      );
  }

  useEffect(() =>
  {
    let higherId;
    let num = Number.NEGATIVE_INFINITY;

    if(posts.length > 0) {
    setPostsIds([...new Set(posts.map(post => post.id))])
    postsIds.forEach(el => {
      if(el > num) {
        num = el;
      }
      higherId = num;
      setLastPostId(higherId)
    })
  }}// eslint-disable-next-line react-hooks/exhaustive-deps
  , [posts])

  console.log(followsPosts)

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
            {posts.map((post) => <Post key={post.id} {...post} />
            
            )}
          </div>
          <Trending />
        </Main>
      );
    }
  }

  return <>{loadPosts()}</>;
}
