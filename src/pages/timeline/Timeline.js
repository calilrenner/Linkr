import { useEffect, useState, useContext } from "react";
import Post from "../../components/Post";
import UserContext from "../../contexts/UserContext";
import { getPosts } from "../../service/api.service";
import Header from "../../components/Header";
import Trending from "../../components/Trending";
import {
  ErrorMsg,
  Container,
  Loader,
  LoaderText,
  Main,
  Title,
  PostCreation,
} from "./mainStyles";

export default function Timeline() {
  const [posts, setPosts] = useState("");
  const [errPosts, SetErrPosts] = useState("");
  const { userData } = useContext(UserContext);

  useEffect(() => {
    getPosts(userData.token)
      .then((res) => setPosts(res.data.posts))

      .catch((err) =>
        SetErrPosts(
          "Houve uma falha ao obter os posts, por favor atualize a página"
        )
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <PostCreation />
            {posts.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
          <Trending />
        </Main>
      );
    }
  }

  return <>{loadPosts()}</>;
}
