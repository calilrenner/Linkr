import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import { colors } from "../globalStyles";
import UserContext from "../contexts/UserContext";
import { getPostsById } from "../service/api.service";

import Header from "../components/Header";
import Trending from "../components/Trending";
import TimelinePost from "./timeline/TimelinePost";

export default function MyPosts() {
    const { userData } = useContext(UserContext);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const id = userData.user.id;
        const token = userData.token;
        const req = getPostsById(id, token);

        req.then(res => setUserPosts(res.data.posts))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Main>
            <div>
                <Header />
                <Title>my posts</Title>
                {userPosts.map((u, i) => (
                    <TimelinePost key={i} {...u} />
                ))}
            </div>
            <Trending />
        </Main>
    );
}

const Main = styled.div`
    display: flex;
    margin: 0 calc((100% - 937px) / 2);
`;

const Title = styled.h1`
    font-size: 43px;
    font-weight: bold;
    margin-top: 125px;
    margin-bottom: 42px;
    color: ${colors.white};
    font-family: 'Oswald', sans-serif;
`;