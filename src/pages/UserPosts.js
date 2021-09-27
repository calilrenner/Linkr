import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getFollows,
  getUserPosts,
  postFollow,
  postUnFollow,
  getShownUser,
} from "../service/api.service";
import UserContext from "../contexts/UserContext";
import Post from "../components/Post";
import Trending from "../components/Trending";
import Header from "../components/Header";
import SearchUser from "../components/SearchUser";
import { Main, Title, Container, Loader, LoaderText, Text } from "./mainStyles";
import styled from "styled-components";
import { loadMoreUserPosts } from "../service/scrollApi.service";
import InfiniteScroll from 'react-infinite-scroller';

export default function UserPosts() {
  const { id } = useParams();
  const { userData, followsId, setFollowsId, onChangePost, setOnChangePost } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [follows, setFollows] = useState([]);
  const [following, setFollowing] = useState(false);
  const [trasnfer, setTrasnfer] = useState(false);
  let higher = Number.POSITIVE_INFINITY;
  const [postsIds, setPostsIds] = useState([]);
  const [firstPostId, setFirstPostId] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [newUserPosts, setNewUserPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [load, setLoad] = useState(false);
  const [shownUser, setShownUser] = useState({});
  const history = useHistory();

  useEffect(
    () => {
      if (!userData.token) {
        history.push("/");
      }
      getUserPosts(id, { token: userData.token }).then((r) => {
        setUserPosts(r.data.posts)
        setTrasnfer(!trasnfer)
        setLoad(true);
        setOnChangePost(!onChangePost)
      })
      getShownUser(id, { token: userData.token }).then((r) =>
      setShownUser(r.data.user)
    );
      getFollows(userData.token).then(r => setFollows(r.data.users))
    },
    [following, id, onChangePost]
  );

  useEffect(() => {
    if(userPosts.length > 0) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  }, [userPosts])

  useEffect(
    () => {
      setFollowsId(follows.map(user => user.id))
    },
    [follows]
  )

  useEffect(
    () =>
      setFollowing(followsId.includes(parseInt(id)) || false),
    [followsId]
  )

  useEffect(() => {
    if(userPosts.length > 0) {
        setPostsIds(userPosts.map(post => post.repostId || post.id));
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
    loadMoreUserPosts(id, firstPostId, userData.token).then(r => {
      setNewUserPosts([...r.data.posts])
      setHasMore(newUserPosts.length > 0)
      setUserPosts([...userPosts, ...newUserPosts]);
    })
  }

  function followUser() {
    setDisabled(true);
    postFollow(id, userData.token)
      .then(() => {
        setDisabled(false);
        setFollowing(true);
      })
      .catch(() => {
        alert("Não foi possível executar a operação.");
        setDisabled(false);
      });
  }

  function unfollowUser() {
    setDisabled(true);
    postUnFollow(id, userData.token)
      .then(() => {
        setDisabled(false);
        setFollowing(false);
      })
      .catch(() => {
        alert("Não foi possível executar a operação.");
        setDisabled(false);
      });
  }

  return (
    <>
      <Header />
      <Main>
        {window.innerWidth < 1000 && <SearchUser />}
        <Title>
          {load ? `${shownUser.username}'s posts` : "Carregando..."}
        </Title>
        {load && userPosts.length === 0 ? 
            <Text>Este usuáro ainda não postou nada ☹️</Text>
        :
          (
            pageNumber === 0 ? 
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
            {userPosts.map((post, index) => (
            <Post key={index} {...post} />))}
      </InfiniteScroll>
        )
      }
      </Main>
      {load && parseInt(id) !== userData.user.id && (
        <Follow
          onClick={() => (following ? unfollowUser() : followUser())}
          disabled={disabled}
          following={following}
        >
          {disabled ? "Loading..." : following ? "Unfollow" : "Follow"}
        </Follow>
      )}
      <Trending />
    </>
  );
}

const Follow = styled.button`
  width: 112px;
  height: 31px;
  background: ${(props) => (props.following ? "#fff" : "#1877F2")};
  font-weight: bold;
  border-radius: 5px;
  color: ${(props) => (props.following ? "#1877F2" : "#fff")};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 85px;
  right: calc((100% - 937px) / 2);
  font-size: 14px;
  cursor: pointer;
  border: none;

  @media (max-width: 1000px) {
    position: absolute;
    right: 20px;
    width: 70px;
    top: 125px;
  }
`;
