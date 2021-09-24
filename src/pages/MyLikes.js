import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { getMyLikes } from "../service/api.service";
import UserContext from "../contexts/UserContext";
import Post from "../components/Post";
import Trending from "../components/Trending";
import Header from "../components/Header";
<<<<<<< HEAD
import { Loader, Main, Title, Text, LoaderText } from "./mainStyles";
import InfiniteScroll from 'react-infinite-scroller';
import { loadMoreLikedPosts } from "../service/scrollApi.service";

export default function MyLikes() {
  const { userData, onChangePosts } = useContext(UserContext);
=======
import { Loader, Main, Title, Text } from "./mainStyles";
import SearchUser from "../components/SearchUser";

export default function MyLikes() {
  const { userData, onChangePost } = useContext(UserContext);
>>>>>>> main
  const [likedPosts, setLikedPosts] = useState({});
  const [load, setLoad] = useState(false);
  let higher = Number.POSITIVE_INFINITY;
  const [firstPostId, setFirstPostId] = useState(0);
  const [postsIds, setPostsIds] = useState([]);
  const [trasnfer, setTrasnfer] = useState(false)
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [newLikedPosts, setNewLikedPosts] = useState([]);

  function postRepost(post) {
    if(post.repostId) {
      return post.repostId;
    } else {
      return post.id;
    }
  }

  useEffect(() => {
    getMyLikes({ token: userData.token }).then((r) => {
      setLikedPosts(r.data.posts);
      setLoad(true);
<<<<<<< HEAD
      setTrasnfer(!trasnfer)
    }
    );
  }, [onChangePosts]);

  useEffect(() => {
    if(likedPosts.length > 0) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  }, [likedPosts])

  useEffect(() => {
    if(likedPosts.length > 0) {
        setPostsIds(likedPosts.map(post => postRepost(post)));
    }
  }, [likedPosts, trasnfer])

  useEffect(() => {
    if(postsIds.length !== 0) {
      postsIds.forEach(id => {
        if(id < higher) {
          higher = id;
          setFirstPostId(higher);
        }
      })
    };
  }, [postsIds, likedPosts])

  function scrollInfinity() {
    loadMoreLikedPosts(firstPostId, userData.token).then(r => {
      setNewLikedPosts([...r.data.posts])
      setHasMore(newLikedPosts.length > 0)
      setLikedPosts([...likedPosts, ...newLikedPosts]);
    })
  }

=======
    });
  }, [onChangePost]);
>>>>>>> main
  return (
    <>
      <Header />
      <Main>
        {window.innerWidth < 1000 && <SearchUser />}
        <Title>my likes</Title>
<<<<<<< HEAD
        {
          pageNumber === 0 ?
          (
            load ?
            (likedPosts.length === 0 ?
              <Text>
                Você ainda não curtiu nada ☹️
              </Text>
              :
              likedPosts.map((post, index) => (
                <Post key={index} {...post} />
              ))
            )
            :
            <Container>
              <Loader />
            </Container>
          )
        :
        <InfiniteScroll
          pageStart={0}
          loadMore={scrollInfinity}
          hasMore={hasMore}
          loader={<LoaderText key={0}>Loading ...</LoaderText>}
        >
            {likedPosts.map((post, index) => (
            <Post key={index} {...post} />))}
        </InfiniteScroll>
        }
=======
        {load ? (
          likedPosts.length === 0 ? (
            <Text>Você ainda não curtiu nada ☹️</Text>
          ) : (
            likedPosts.map((post, index) => <Post key={index} {...post} />)
          )
        ) : (
          <Container>
            <Loader />
          </Container>
        )}
>>>>>>> main
      </Main>
      <Trending />
    </>
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
