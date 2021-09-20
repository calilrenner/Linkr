import { useEffect, useState, useContext } from "react";
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

  useEffect(() => {
    timelinePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Title>timeline</Title>
            <CreateNewPost timelinePosts={timelinePosts} />
            {posts.map((post, index) => (
              <Post key={index} {...post}/>
            ))}
          </div>
          <Trending />
        </Main>
      );
    }
  }

  return <>{loadPosts()}</>;
}
