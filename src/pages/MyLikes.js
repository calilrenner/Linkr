import { useEffect, useState, useContext } from "react";
import { getMyLikes } from "../service/api.service";
import UserContext from "../contexts/UserContext";
import Post from "../components/Post";
import Trending from "../components/Trending";
import Header from "../components/Header";
import { Main, Title } from "./mainStyles";

export default function MyLikes() {
  const { userData } = useContext(UserContext);
  const [likedPosts, setLikedPosts] = useState({});

  useEffect(() => {
    getMyLikes({ token: userData.token }).then((r) =>
      setLikedPosts(r.data.posts)
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Header />
      <Main>
        <Title>my likes</Title>
        {likedPosts.length > 0 ? (
          likedPosts.map((post, index) => <Post key={index} {...post} />)
        ) : (
          <Title>Você ainda não curtiu nada :(</Title>
        )}
      </Main>
      <Trending />
    </>
  );
}
