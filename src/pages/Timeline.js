import { useHistory } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import Post from "../components/Post";
import UserContext from "../contexts/UserContext";
import { getFollowsPosts, getFollows } from "../service/api.service";
import Header from "../components/Header";
import Trending from "../components/Trending";
import CreateNewPost from "../components/CreateNewPost";
import styled from "styled-components";
import { colors } from "../globalStyles";
import InfiniteScroll from 'react-infinite-scroller';
import { loadMorePosts } from "../service/scrollApi.service";
import SearchUser from "../components/SearchUser";
import { Container, Loader, LoaderText, Main, Title } from "./mainStyles";


export default function Timeline() {
  const { userData, onChangePost, setOnChangePost } = useContext(UserContext);
  const [followedPosts, setFollowedPosts] = useState("");
  const [followedUsers, setFollowedUsers] = useState([]);
  const [postsIds, setPostsIds] = useState([]);
  const [trasnfer, setTrasnfer] = useState(false)
  let higher = Number.POSITIVE_INFINITY;
  const [firstPostId, setFirstPostId] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [newPosts, setNewPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [errPosts, setErrPosts] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (!userData.token) {
      history.push("/");
    }
  }, []);

  const useInterval = (callBackFunction, delay) => {
    const savedCallBackFunction = useRef();
    useEffect(() => {
      savedCallBackFunction.current = callBackFunction;
    }, [callBackFunction]);

    useEffect(() => {
      const newQueuePosts = () => {
        savedCallBackFunction.current();
      };
      if (delay !== null) {
        let update = setInterval(newQueuePosts, delay);
        return () => clearInterval(update);
      }
    }, [delay]);
  };

  useInterval(() => {
    setOnChangePost(!onChangePost);
  }, 15000);

  useEffect(() => 
  {
    getFollows(userData.token).then(r => setFollowedUsers(r.data.users))
    getFollowsPosts(userData.token).then(r => {
      setFollowedPosts(r.data.posts)
      setTrasnfer(!trasnfer)
    }).catch((err) =>
      setErrPosts(
        "Houve uma falha ao obter os posts, por favor atualize a página"
      )
    )
  }
  ,[onChangePost])

    useEffect(() => {
      if(followedPosts.length > 0) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    }, [followedPosts])

    useEffect(() => {
      if(followedPosts.length > 0) {
          setPostsIds(followedPosts.map(post => post.repostId || post.id));
      }
    }, [followedPosts, trasnfer])

    useEffect(() => {
      if(postsIds.length !== 0) {
        postsIds.forEach(id => {
          if(id < higher) {
            higher = id;
            setFirstPostId(higher);
          }
        })
      }
    }, [postsIds, followedPosts])

    function scrollInfinity() {
      loadMorePosts(firstPostId, userData.token).then(r => {
        setNewPosts([...r.data.posts])
        setHasMore(newPosts.length > 0)
        setFollowedPosts([...followedPosts, ...newPosts]);
      })
    }

    function posts() {
      if(followedUsers.length === 0) {
        return (
          <NoFollow>Você não segue ninguém ainda, procure por perfis na busca.</NoFollow>
        ) 
        }else if(followedPosts.length === 0 && pageNumber === 0) {
          return (
          <NoFollow>Nenhuma publicação encontrada.</NoFollow>
          )
        } else {
          return (
          <InfiniteScroll
            pageStart={0}
            loadMore={scrollInfinity}
            hasMore={hasMore}
            loader={<LoaderText key={0}>Loading ...</LoaderText>}
          >
            {followedPosts.map((post, index) => (
            <Post key={index} {...post} />))}
          </InfiniteScroll>
          )
        }
      }

    function loadPosts() {
      if (errPosts !== "") {
        return <ErrorMsg>{errPosts}</ErrorMsg>;
      } else if (followedPosts === "" && pageNumber === 0) {
      return (
        <Container>
          <Loader />
          <LoaderText>Carregando...</LoaderText>
        </Container>
      );
    } else {
      return (
        <Main>
          <div>
            <Header />
            {window.innerWidth < 1000 && <SearchUser />}
            <Title>timeline</Title>
            <CreateNewPost />
            {posts()}
          </div>
          <Trending />
        </Main>
      );
    }
  }
  return <>{loadPosts()}</>;
}

const NoFollow = styled.div`
  font-weight: bold;
  font-size: 43px;
  color: #fff;
  width: 611px;
  margin-top: 50px;
  background-color: ${colors.black};
  border-radius: 16px;
  height: 147px;
  display: flex;
  align-items: center;
  padding: 15px;

  @media (max-width: 1000px) {
    width: 100%;
    border-radius: 0;
  }
`

const ErrorMsg = styled.div`    
    display: flex;
    justify-content:center;
    margin-top: 50px;
    color: ${colors.white};
    font-size: 20px;
`;
