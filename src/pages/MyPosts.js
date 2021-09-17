import styled from "styled-components";

import { colors } from "../globalStyles";
import Header from "../components/Header";
import Trending from "../components/Trending";

export default function MyPosts() {
    return (
        <Main>
            <Header />
            <Title>my posts</Title>
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
    color: ${colors.white};
    font-family: 'Oswald', sans-serif;
`;