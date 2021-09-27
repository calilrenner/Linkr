import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { getUserPosts } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import Post from "../components/Post";
import { Main, Title, Loader, Text, LoaderText } from "./mainStyles";
import InfiniteScroll from "react-infinite-scroller";
import { loadMoreMyPosts } from "../service/scrollApi.service";
import SearchUser from "../components/SearchUser";
import { useHistory } from "react-router-dom";

export default function MyPosts() {
  const { userData, onChangePost } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState("");
  let higher = Number.POSITIVE_INFINITY;
  const [firstPostId, setFirstPostId] = useState(0);
  const [postsIds, setPostsIds] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [newUserPosts, setNewUserPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (!userData.token) {
      history.push("/");
    }
    if (userData.token) {
      getUserPosts(userData.user.id, { token: userData.token }).then((res) => {
        setUserPosts(res.data.posts);
      });
    }
  }, [onChangePost]);

  useEffect(() => {
    if (userPosts.length > 0) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }, [userPosts]);

  useEffect(() => {
    if (userPosts.length > 0) {
      setPostsIds(userPosts.map((post) => post.repostId || post.id));
    }
  }, [userPosts]);

  useEffect(() => {
    if (postsIds.length !== 0) {
      postsIds.forEach((id) => {
        if (id < higher) {
          higher = id;
          setFirstPostId(higher);
        }
      });
    }
  }, [postsIds, userPosts, hasMore]);

  function scrollInfinity() {
    loadMoreMyPosts(userData.user.id, firstPostId, userData.token).then((r) => {
      setNewUserPosts([...r.data.posts]);
      setHasMore(newUserPosts.length > 0);
      setUserPosts([...userPosts, ...newUserPosts]);
    });
  }

  return (
    <Main>
      <div>
        <Header />
        {window.innerWidth < 1000 && <SearchUser />}
        <Title>my posts</Title>
        {pageNumber === 0 ? (
          userPosts === "" ? (
            <Container>
              <Loader />
            </Container>
          ) : userPosts.length === 0 ? (
            <Text>Você ainda não postou nada ☹️</Text>
          ) : (
            userPosts.map((u, i) => <Post key={i} {...u} />)
          )
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={scrollInfinity}
            hasMore={hasMore}
            loader={<LoaderText key={0}>Loading ...</LoaderText>}
          >
            {userPosts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </InfiniteScroll>
        )}
      </div>
      <Trending />
    </Main>
  );
}

const Container = styled.div`
  margin: 0 150px;

  @media (max-width: 1000px) {
    display: flex;
    justify-content: center;
    margin-top: -150px;
  }
`;
