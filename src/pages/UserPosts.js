import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getUserPosts } from "../service/api.service";
import UserContext from "../contexts/UserContext";
import Post from "../components/Post";
import Trending from "../components/Trending";
import Header from "../components/Header";
import SearchUser from "../components/SearchUser";
import { Main, Title, Container, Loader, LoaderText } from "./mainStyles";

export default function UserPosts() {
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(
    () =>
      getUserPosts(id, { token: userData.token }).then((r) =>
        setUserPosts(r.data.posts)
      ),
    [id]
  );
  return (
    <>
      <Header />
      <Main>
        {window.innerWidth < 1000 ? <SearchUser /> : ""}
        <Title>
          {userPosts.length > 0
            ? `${userPosts[0].user.username}'s posts`
            : "Carregando..."}
        </Title>
        {userPosts.length > 0 ? (
          userPosts.map((post, index) => <Post key={index} {...post} />)
        ) : (
          <Container>
            <Loader />
            <LoaderText>Carregando...</LoaderText>
          </Container>
        )}
      </Main>
      <Trending />
    </>
  );
}
