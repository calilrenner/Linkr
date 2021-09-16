import { useEffect, useState, useContext } from "react";
import TimelinePost from "./TimelinePost";
import { VscLoading } from 'react-icons/vsc'
import styled from "styled-components";
import { colors } from "../../globalStyles";
import UserContext from "../../contexts/UserContext";
import { getPosts } from "../../service/api.service";
import Header from "../../components/Header";
import Trending from "../../components/Trending";

export default function Timeline() {

    const [posts, setPosts] = useState('');
    const [errPosts, SetErrPosts] = useState('')
    const { user }  = useContext(UserContext);

    useEffect(() => {
            getPosts(user.token)
                .then(res => setPosts(res.data.posts))
                .catch(err => SetErrPosts('Houve uma falha ao obter os posts, por favor atualize a página'))
    }, []);// eslint-disable-line react-hooks/exhaustive-deps


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
                        <PostCreation />
                        {posts.map(post => <TimelinePost key={post.id} {...post} />)}
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

const PostCreation = styled.div`
width: 611px;
height: 209px;
border-radius: 16px;
background-color: ${colors.white};
margin-top: 43px;

@media (max-width: 1000px) {
    border-radius: 0;
    width: 100vw;
}
`;

const Title = styled.h1`
    font-size: 43px;
    font-weight: bold;
    margin-top: 125px;
    color: ${colors.white};
    font-family: 'Oswald', sans-serif;
`;