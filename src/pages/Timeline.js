import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Post from "../components/Post";
import UserContext from "../contexts/UserContext";
import { getPosts } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import CreateNewPost from "../components/CreateNewPost";
import SearchUser from "../components/SearchUser";
import { getLoggedUser } from "../service/loginPersistance.service";
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
  const { userData, setUserData, onChangePost } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.token) {
      history.push("/");
    }
    timelinePosts();
  }, [onChangePost]);

  function timelinePosts() {
    getPosts(userData.token)
      .then((res) => setPosts(res.data.posts))

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
            {window.innerWidth < 1000 && <SearchUser />}
            <Title>timeline</Title>
            <CreateNewPost timelinePosts={timelinePosts} />
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
          <Trending />
        </Main>
      );
    }
  }

  return <>{loadPosts()}</>;
}
