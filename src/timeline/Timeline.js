import { useEffect, useState } from "react";
import TimelinePost from "./TimelinePost";
import { VscLoading } from 'react-icons/vsc'
import styled from "styled-components";
import { colors } from "../globalStyles";
import axios from "axios";

export default function Timeline() {

    const [token, setToken] = useState('');
    const [posts, setPosts] = useState('');
    const [errPosts, SetErrPosts] = useState('')

    function login() {

        const signIn = {
            "email": "leandro@driven.com",
            "password": "12"
        }
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in', signIn);
        return promise;
    }

    function getPosts(token) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', config);
        return promise;
    }

    useEffect(() => {
        login()
            .then(res => setToken(res.data.token))
            .catch(err => console.log(err.response))
    }, []);

    useEffect(() => {
        if (token !== '') {
            getPosts(token)
                .then(res => setPosts(res.data.posts))
                .catch(err => SetErrPosts('Houve uma falha ao obter os posts, por favor atualize a página'))
        } else {
            return;
        }
    }, [token]);


    function loadPosts() {
        if (errPosts === '') {
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
                    <DivHashTag />
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
`


const Loader = styled(VscLoading)`
        height: 150px;
        width: 150px;
        animation: rotation 0.3s infinite linear;

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

    @keyframes brink {
        50% {
            opacity: 0;
          }
      }
`;

const ErrorMsg = styled.div`    
    display: flex;
    justify-content:center;
    margin-top: 50px
`

const DivHashTag = styled.div`
      width: 301px;
      height: 406px;
      background-Color: ${colors.black};
      position: fixed;
      top: 211px;
      right: calc((100% - 937px) / 2);
      border-radius: 16px;

      @media (max-width: 1000px) {
        display: none;
    }
`

const Main = styled.div`
display: flex;
margin: 0 calc((100% - 937px) / 2);

@media (max-width: 1000px) {
    margin: 0;
}
`

const PostCreation = styled.div`
width: 611px;
height: 209px;
border-radius: 16px;
background-color: ${colors.darkGrey};
margin-top: 43px;

@media (max-width: 1000px) {
    border-radius: 0;
    width: 100%;
}
`

const Header = styled.div`
    height: 72px;
    background-color: ${colors.black};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`

const Title = styled.h1`
    font-size: 43px;
    margin-top: 125px;
    margin-left: 18px;
    color: ${colors.black};
`