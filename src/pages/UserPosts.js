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

export default function UserPosts() {
  const { id } = useParams();
  const { userData, followsId, setFollowsId } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [follows, setFollows] = useState([]);
  const [following, setFollowing] = useState(false);
  const [load, setLoad] = useState(false);
  const [shownUser, setShownUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (!userData.token) {
      history.push("/");
    }
    getUserPosts(id, { token: userData.token }).then((r) => {
      setUserPosts(r.data.posts);
      setLoad(true);
    });
    getShownUser(id, { token: userData.token }).then((r) =>
      setShownUser(r.data.user)
    );
    getFollows(userData.token).then((r) => setFollows(r.data.users));
  }, [following, id]);

  useEffect(() => {
    setFollowsId(follows.map((user) => user.id));
  }, [follows]);

  useEffect(
    () => setFollowing(followsId.includes(parseInt(id)) || false),
    [followsId]
  );

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
        {load ? (
          userPosts.length === 0 ? (
            <Text>Este usuáro ainda não postou nada ☹️</Text>
          ) : (
            userPosts.map((post, index) => <Post key={index} {...post} />)
          )
        ) : (
          <Container>
            <Loader />
            <LoaderText>Carregando...</LoaderText>
          </Container>
        )}
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
