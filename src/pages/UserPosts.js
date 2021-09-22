import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getFollows, getUserPosts, postFollow, postUnFollow } from "../service/api.service";
import UserContext from "../contexts/UserContext";
import Post from "../components/Post";
import Trending from "../components/Trending";
import Header from "../components/Header";
import { Main, Title, Container, Loader, LoaderText } from "./mainStyles";
import styled from "styled-components";

export default function UserPosts() {
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [follows, setFollows] = useState([]);
  const [followsId, setFollowsId] = useState([]);
  const [following, setFollowing] = useState(false);

  useEffect(
    () => {
      getUserPosts(id, { token: userData.token }).then((r) =>
        setUserPosts(r.data.posts)
      )
      getFollows(userData.token).then(r => setFollows(r.data.users))
    },
    [following] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(
    () => {
      setFollowsId(follows.map(user => user.id))
      // setFollowing(followsId.includes(parseInt(id)) || false)
    },
    [follows] // eslint-disable-line react-hooks/exhaustive-deps
  )

  useEffect(
    () =>
      setFollowing(followsId.includes(parseInt(id)) || false),
    [followsId] // eslint-disable-line react-hooks/exhaustive-deps
  )

  function followUser() {
    setDisabled(true)
    postFollow(id, userData.token).then(() => {
      setDisabled(false)
      setFollowing(true);
    }
    ).catch(() => {
      alert('Não foi possível executar a operação.')
      setDisabled(false)
    });
  };

  function unfollowUser() {
    setDisabled(true)
    postUnFollow(id, userData.token).then(() => {
      setDisabled(false)
      setFollowing(false)
    }
    ).catch(() => {
      alert('Não foi possível executar a operação.')
      setDisabled(false)
    });
  }

  return (
    <>
      <Header />
      <Main>
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
      {parseInt(id) !== userData.user.id && <Follow
        onClick={() => following ? unfollowUser() : followUser()}
        disabled={disabled}
        following={following}
      >
        {disabled ? 'Loading...' : (following ? 'Unfollow' : 'Follow')}
      </Follow>}
      <Trending />
    </>
  );
}


const Follow = styled.button`
  width: 112px;
  height: 31px;
  background: ${props => props.following ? '#fff' : '#1877F2'};
  font-weight: bold;
  border-radius: 5px;
  color: ${props => props.following ? '#1877F2' : '#fff'};
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
`
