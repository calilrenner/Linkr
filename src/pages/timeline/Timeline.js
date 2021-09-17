import { useEffect, useState, useContext } from "react";
import TimelinePost from "./TimelinePost";
import { VscLoading } from 'react-icons/vsc'
import styled from "styled-components";
import { colors } from "../../globalStyles";
import UserContext from "../../contexts/UserContext";
import { getPosts } from "../../service/api.service";
import Header from "../../components/Header";
import Trending from "../../components/Trending";
import CreateNewPost from "../../components/CreateNewPost";

export default function Timeline() {

    const [posts, setPosts] = useState('');
    const [errPosts, SetErrPosts] = useState('');
    const { userData }  = useContext(UserContext);
    const [onChangeLike, setOnChangeLike] = useState(false);

    useEffect(() => {
            timelinePosts();
                // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function timelinePosts(){
        getPosts(userData.token)
            .then(res => setPosts(res.data.posts))

            .catch(err => SetErrPosts('Houve uma falha ao obter os posts, por favor atualize a página'));
    }

    function loadPosts() {
        if (errPosts !== '') {
            return (
                <ErrorMsg>{errPosts}</ErrorMsg>
            )
        }
        if (posts === '') {
            return (
                <Container>
                    <Loader />
                    <LoaderText>Carregando...</LoaderText>
                </Container>
            )
        } else if (posts.length === 0) {
            return (
                <ErrorMsg>Nenhum post encontrado</ErrorMsg>
            )
        } else {
            return (
                <Main>
                    <div>
                        <Header />
                        <Title>timeline</Title>
                        <CreateNewPost timelinePosts={timelinePosts}/>
                        {posts.map((post, index) => <TimelinePost key={index} {...post} setOnChangeLike={setOnChangeLike} onChangeLike={onChangeLike}/>)}
                    </div>
                    <Trending />
                </Main>
            )
        }
    }

    return (
        <>
            {loadPosts()}
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
`;


const Loader = styled(VscLoading)`
        height: 150px;
        width: 150px;
        animation: rotation 0.3s infinite linear;
        color: ${colors.white};
        margin-top: 200px;

        @keyframes rotation {
            from {
            transform: rotate(0deg);
            }
            to {
            transform: rotate(359deg);
            }
        }
`;

const LoaderText = styled.h1`
    animation: brink 0.3s infinite linear;
    color: ${colors.white};

    @keyframes brink {
        50% {
            opacity: 0;
          }
      }
`;

const ErrorMsg = styled.div`    
    display: flex;
    justify-content:center;
    margin-top: 50px;
`;

const Main = styled.div`
display: flex;
margin: 0 calc((100% - 937px) / 2);

@media (max-width: 1000px) {
    margin: 0;
}
`;

const Title = styled.h1`
    font-size: 43px;
    font-weight: bold;
    margin-top: 125px;
    color: ${colors.white};
    font-family: 'Oswald', sans-serif;
`;