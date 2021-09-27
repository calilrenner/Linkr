import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { getUserPosts } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import Post from "../components/Post";
import { Main, Title, Loader, Text, LoaderText } from "./mainStyles";
import InfiniteScroll from 'react-infinite-scroller';
import { loadMoreMyPosts } from "../service/scrollApi.service";
import SearchUser from "../components/SearchUser";
import { useHistory } from "react-router-dom";

export default function MyPosts() {
  const { userData, onChangePost, setOnChangePost } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [load, setLoad] = useState(false);
  let higher = Number.POSITIVE_INFINITY;
  const [firstPostId, setFirstPostId] = useState(0);
  const [postsIds, setPostsIds] = useState([]);
  const [trasnfer, setTrasnfer] = useState(false)
  const [pageNumber, setPageNumber] = useState(0);
  const [newUserPosts, setNewUserPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();

  function postRepost(post) {
    if(post.repostId) {
      return post.repostId;
    } else {
      return post.id;
    }
  }

  useEffect(() => {
    if (!userData.token) {
      history.push("/");
    }
    if (userData.token) {
      getUserPosts(userData.user.id, { token: userData.token }).then((res) => {
        setUserPosts(res.data.posts);
        setLoad(true);
        setTrasnfer(!trasnfer)
      });
    }
  }, [onChangePost, hasMore]);

  useEffect(() => {
    if(userPosts.length > 0) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  }, [userPosts])

  useEffect(() => {
    if(userPosts.length > 0) {
        setPostsIds(userPosts.map(post => postRepost(post)));
    }
  }, [userPosts, trasnfer])

  useEffect(() => {
    if(postsIds.length !== 0) {
      postsIds.forEach(id => {
        if(id < higher) {
          higher = id;
          setFirstPostId(higher);
        }
      })
    };
  }, [postsIds, userPosts])

  function scrollInfinity() {
    loadMoreMyPosts(userData.user.id, firstPostId, userData.token).then(r => {
      setNewUserPosts([...r.data.posts])
      setHasMore(newUserPosts.length > 0)
      setUserPosts([...userPosts, ...newUserPosts]);
    })
  }
  
  return (
    <Main>
      <div>
        <Header />
        {window.innerWidth < 1000 && <SearchUser />}
        <Title>my posts</Title>
        {
          pageNumber === 0 || userPosts.length === 0?
        (
          load ? 
          (userPosts.length === 0 ?
            <Text>
              Você ainda não postou nada ☹️
            </Text>
            :
            userPosts.map((u, i) => (
              <Post key={i} {...u} />
            ))
          )
        : 
        (
          <Container>
            <Loader />
          </Container>
        )
        )
        :
        (
        <InfiniteScroll
          pageStart={0}
          loadMore={scrollInfinity}
          hasMore={hasMore}
          loader={<LoaderText key={0}>Loading ...</LoaderText>}
        >
            {userPosts.map((post, index) => (
            <Post key={index} {...post} />))}
        </InfiniteScroll>
        )
        }
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
