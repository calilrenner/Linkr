import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";

export default function CommentIcon(){
    return (
        <Box>
            <Icon />
            <Text>10 comments</Text>
        </Box>
    );
}

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Icon = styled(AiOutlineComment)`
    margin-top: 15px;
    font-size: 20px;
    cursor: pointer;
`;

const Text = styled.p`
    font-size: 11px;
    text-align: center;
`;