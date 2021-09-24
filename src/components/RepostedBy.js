import { BiRepost } from "react-icons/bi";
import styled from 'styled-components';

export default function RepostedBy({repostedBy}) {
    return (
        <Content>
            <BiRepost size="20"/>
            <span>Re-posted by <strong>{repostedBy.username}</strong></span>
        </Content>
    );
}

const Content = styled.div`
    background-color: #1E1E1E;
    display: flex;
    border-radius: 16px;
    padding: 9px 13px;
    width: 611px;
    height: 100px;
    margin-bottom: -95px;
    color: #FFF;
    margin-top: 29px;
    
    span{
        font-size: 11px;
        line-height: 13px;
        margin-left: 6px;
        margin-top: 2px;
    }
    @media (max-width: 1000px) {
        margin-top: 25px;
        width: 100%;
        padding-top: 3px;
        border-radius: 0;
    }
`;