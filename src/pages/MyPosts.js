import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { getUserPosts } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import Post from "../components/Post";
import { Main, Title } from "./mainStyles";
import SearchUser from "../components/SearchUser";

export default function MyPosts() {
  const { userData, onChangePost } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const id = userData.user.id;
    const token = { token: userData.token };
    const req = getUserPosts(id, token);

    req.then((res) => setUserPosts(res.data.posts));
  }, [onChangePost]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Main>
      <div>
        <Header />
        {window.innerWidth < 1000 ? <SearchUser /> : ""}
        <Title>my posts</Title>
        {userPosts.map((u, i) => (
          <Post key={i} {...u} />
        ))}
      </div>
      <Trending />
    </Main>
  );
}
