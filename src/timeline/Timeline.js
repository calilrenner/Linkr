import { useEffect, useState } from "react";
import TimelinePost from "./TimelinePost";
import axios from "axios";
import { login } from "./createUser";
import { VscLoading } from 'react-icons/vsc'
import styled from "styled-components";

export default function Timeline() {

    const [token, setToken] = useState('');
    const [posts, setPosts] = useState([]);

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
            axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', config).then(res => setPosts(res.data.posts))
        }
    }, [token]);

    const LoadginStyle = {
        fontSize: "150px",
        animation: 'rotation 1s infinite linear',

    }

    return (
        <>
        {posts.length > 0 ? posts.map(post => <TimelinePost key={post.id} {...post}/>) : <Container><Loader/><LoaderText>Carregando...</LoaderText></Container>}
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
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
`