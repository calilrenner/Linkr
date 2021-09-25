import { useContext, useEffect } from "react";
import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { getPostComments } from "../service/api.service";

export default function CommentIcon({showComments, setShowComments, postId, postComments, setPostComments, myComment}){
    const {userData} = useContext(UserContext);

    useEffect(() => {
        const id = postId;
          const token = userData.token;
          const req = getPostComments(id, token)
    
          req.then(res => setPostComments(res.data.comments))
          req.catch(() => alert("Os comentários não foram carregados. Tente novamente mais tarde."))
      },[myComment]) 
    return (
        <Box>
            <Icon onClick={() => setShowComments(!showComments)}/>
            <Text>
                {postComments ? postComments.length : 0} {postComments.length === 1 ? "comment" : "comments"}
            </Text>
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