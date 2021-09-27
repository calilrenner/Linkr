import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { getMyLikes } from "../service/api.service";
import UserContext from "../contexts/UserContext";
import Post from "../components/Post";
import Trending from "../components/Trending";
import Header from "../components/Header";
import { Loader, Main, Title, Text, LoaderText } from "./mainStyles";
import InfiniteScroll from 'react-infinite-scroller';
import { getMyLikesIds, loadMoreLikedPosts } from "../service/scrollApi.service";
import SearchUser from "../components/SearchUser";
import { useHistory } from "react-router-dom";

export default function MyLikes() {
  const [getInitial, setGetInicial] = useState('')
  const { userData, onChangePosts } = useContext(UserContext);
  const [likedPosts, setLikedPosts] = useState('');
  let higher = Number.POSITIVE_INFINITY;
  let lower = Number.NEGATIVE_INFINITY;
  const [firstPostId, setFirstPostId] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [newLikedPosts, setNewLikedPosts] = useState([]);
  const history = useHistory();
  const [ lastPostId, setLastPostId ] = useState(0)

  useEffect(() => {
    if (!userData.token) {
      history.push("/");
    }
    getMyLikes(userData.token).then((r) => {
      setGetInicial(r.data.posts.map(post => post.id));
    }
    );
  }, [onChangePosts]);

  useEffect(() => {
    if(likedPosts.length > 0) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  }, [likedPosts])

  useEffect(() => {
    if(getInitial.length !== 0) {
      getInitial.forEach(id => {
        if(id < higher) {
          higher = id;
          setFirstPostId(higher);
        }
      })
    };
    if(getInitial.length !== 0) {
      getInitial.forEach(id => {
        if(id > lower) {
          lower = id;
          setLastPostId(lower);
        }
      })
    };
  }, [getInitial, likedPosts, hasMore])

  useEffect(() => {
    if(firstPostId !== 0) {
      getMyLikesIds(firstPostId, userData.token).then((r) =>
        setLikedPosts(r.data.posts))
    }
  }, [getInitial, onChangePosts, firstPostId]);

  function scrollInfinity() {
    loadMoreLikedPosts(lastPostId, userData.token).then(r => {
      setNewLikedPosts([...r.data.posts])
      setHasMore(newLikedPosts.length > 0)
      setLikedPosts([...likedPosts, ...newLikedPosts]);
    })
  }

  return (
    <>
      <Header />
      <Main>
        {window.innerWidth < 1000 && <SearchUser />}
        <Title>my likes</Title>
        {
          pageNumber === 0 ?
            (likedPosts === '' ?
            <Container>
              <Loader />
            </Container>
            :
            (likedPosts.length === 0 ?
            (<Text>
              Você ainda não curtiu nada ☹️
            </Text>)
            :
            (likedPosts.map((post, index) => (
              <Post key={index} {...post} />)))))
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
