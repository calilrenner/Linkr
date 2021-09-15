import { useEffect, useState } from "react";
import TimelinePost from "./TimelinePost";
import axios from "axios";
import { login } from "./createUser";
import { VscLoading } from 'react-icons/vsc'
import styled from "styled-components";

export default function Timeline() {

    const [token, setToken] = useState('');
    const [posts, setPosts] = useState('');
    const [errPosts, SetErrPosts] = useState('')

    useEffect(() => {
        login().then(res => setToken(res.data.token)).catch(err => console.log(err.response))
    }, [])

    useEffect(() => {
        if(token !== '') {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', config).then(res => setPosts(res.data.posts)).catch(err => SetErrPosts('Houve uma falha ao obter os posts, por favor atualize a página'))
        }
    }, [token]);

    console.log(errPosts)

    function loadPosts() {
        if(errPosts === '') {
            if(posts === '') {
                return (
                    <Container><Loader/><LoaderText>Carregando...</LoaderText></Container>
                )
            } else if(posts.length > 0) {
                return (
                    posts.map(post => <TimelinePost key={post.id} {...post}/>)
                )
            }  else if(posts.length === 0) {
                return (
                    <ErrorMsg>Nenhum post encontrado</ErrorMsg>
                )
            } 
            
            
        } else {
            return (
                <ErrorMsg>{errPosts}</ErrorMsg>
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