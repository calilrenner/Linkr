import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getPostsByHashtag } from "../service/api.service";
import UserContext from "../contexts/UserContext";
import Post from "../components/Post";
import Trending from "../components/Trending";
import Header from "../components/Header";
import { Main, Title, Container, Loader, LoaderText, Text } from "./mainStyles";
import InfiniteScroll from 'react-infinite-scroller';
import { loadMoreHashTagPosts } from "../service/scrollApi.service";
import SearchUser from "../components/SearchUser";

export default function Hashtag() {
  const { hashtag } = useParams();
  const { userData } = useContext(UserContext);
  const [hashtagPosts, setHashtagPosts] = useState([]);
  let higher = Number.POSITIVE_INFINITY;
  const [firstPostId, setFirstPostId] = useState(0);
  const [postsIds, setPostsIds] = useState([]);
  const [trasnfer, setTrasnfer] = useState(false)
  const [pageNumber, setPageNumber] = useState(0);
  const [newHashTagPosts, setNewHashTagPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [load, setLoad] = useState(false);
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
    getPostsByHashtag({ token: userData.token }, hashtag).then((r) =>
      {
        setHashtagPosts(r.data.posts)
        setTrasnfer(!trasnfer)
      }
    );
  }, [hashtag, userData.token]);

  useEffect(() => {
    if(hashtagPosts.length > 0) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  }, [hashtagPosts])

  useEffect(() => {
    if(hashtagPosts.length > 0) {
        setPostsIds(hashtagPosts.map(post => postRepost(post)));
    }
  }, [hashtagPosts, trasnfer])

  useEffect(() => {
    if(postsIds.length !== 0) {
      postsIds.forEach(id => {
        if(id < higher) {
          higher = id;
          setFirstPostId(higher);
        }
      })
    };
  }, [postsIds, hashtagPosts])

  function scrollInfinity() {
    loadMoreHashTagPosts(hashtag, firstPostId, userData.token).then(r => {
      setNewHashTagPosts([...r.data.posts])
      setHasMore(newHashTagPosts.length > 0)
      setHashtagPosts([...hashtagPosts, ...newHashTagPosts]);
    })
  }

  return (
    <>
      <Header />
      <Main>
        {window.innerWidth < 1000 && <SearchUser />}
        <Title># {hashtag}</Title>
        {load && hashtagPosts.posts ? (
          hashtagPosts.posts.length === 0 ? (
            <Text>Nada sobre esse assunto ☹️</Text>
          ) : (
            hashtagPosts.posts.map((post, index) => (
              <Post key={index} {...post} />
            ))
          )
        ) :
          (pageNumber === 0 ?
            <Container>
            <Loader />
            <LoaderText>Carregando...</LoaderText>
          </Container>
          :
        <InfiniteScroll
          pageStart={0}
          loadMore={scrollInfinity}
          hasMore={hasMore}
          loader={<LoaderText key={0}>Loading ...</LoaderText>}
        >
            {hashtagPosts.map((post, index) => (
            <Post key={index} {...post} />))}
        </InfiniteScroll> 
            )
        }
      </Main>
      <Trending />
    </>
  );
}
