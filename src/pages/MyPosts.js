import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { getUserPosts } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import Post from "../components/Post";
import { Main, Title } from "./mainStyles";

export default function MyPosts() {
  const { userData, onChangePost } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const id = userData.user.id;
    const token = { token: userData.token };
    const req = getUserPosts(id, token);

    req.then((res) => setUserPosts(res.data.posts));
  }, [onChangePost]); 

  return (
    <Main>
      <div>
        <Header />
        <Title>my posts</Title>
        {userPosts.map((u, i) => (
          <Post key={i} {...u} />
        ))}
      </div>
      <Trending />
    </Main>
  );
}
