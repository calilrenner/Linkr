import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { postNewComment } from "../service/api.service";

export default function Comments({ postComments, userId, postId }) {
    const {userData} = useContext(UserContext);
    const [myComment, setMyComment] = useState("");

    function postMyComment(e) {
        e.preventDefault();

        const id = postId;
        const body = {text: myComment};
        const token = userData.token;
        const req = postNewComment(id, body, token);
        
        req.then(() => setMyComment(""))
        req.catch(() => alert("Não foi possível publicar o comentário. Por favor, tente novamente mais tarde."));
    }

    return (
        <Box>
            {postComments.map(p => (
                <Content key={p.id} >
                    <div>
                        <Image>
                            <img src={p.user.avatar} alt={p.user.username} />
                        </Image>
                        <TextFields>
                            <div>
                                <User>{p.user.username}</User>
                                <Follow>
                                    {p.user.id === userId ? 
                                        "• post’s author"
                                    :
                                        "asfasf" // -------IMPLEMENTAR----------
                                    }
                                    
                                </Follow>
                            </div>
                            <Comment>{p.text}</Comment>
                        </TextFields>
                    </div>
                    <Separator /> 
                </Content>
            ))}
            <WriteComment>
                <Image>
                    <img src={userData.user.avatar} alt={userData.user.username} />
                </Image>
                <form onSubmit={postMyComment}>
                    <Input
                        type="text" 
                        placeholder="write a comment..." 
                        value={myComment} 
                        onChange={e => setMyComment(e.target.value)} 
                    />
                    <Button onClick={postMyComment} />
                </form>
            </WriteComment>       
        </Box>
    );
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

const Box = styled.div`
    position: relative;
    z-index: 1;
    width: 611px;
    margin-top: -68px;
    background: #1E1E1E;
    padding: 88px 25px 0 25px;
    display: flex;
    flex-direction: column;

    div{
        display: flex;
    }
`;

const Image = styled.div`
    width: 39px;
    height: 39px;
    border-radius: 50%;
    background-color: #4e4e4e;
    margin-right: 18px;

    img{
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }
`;

const TextFields = styled.div`
    display: flex;
    flex-direction: column;
`;

const User = styled.span`
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #FFF;
`;

const Follow = styled.span`
    font-size: 14px;
    line-height: 17px;
    color: #565656;
    margin-left: 4px;
`;

const Comment = styled.p`
    font-size: 14px;
    line-height: 17px;
    color: #ACACAC;
    margin-top: 3px;
`;

const Separator = styled.div`
    width: 560px;
    margin: 16px 0;
    border: 1px solid #353535;
`;

const WriteComment = styled.div`
    margin-bottom: 25px;
`;

const Input = styled.input`
    width: 505px;
    height: 39px;
    background: #252525;
    border-radius: 8px;
    border: none;
    padding-left: 15px;
    font-family: "Lato", sans-serif;
    color: #FFF;

    ::placeholder{
        font-style: italic;
        font-size: 14px;
        line-height: 17px; 
    }
`;

const Button = styled(FiSend)`
    color: #FFF;
    font-size: 20px;
    position: absolute;
    right: 40px;
    bottom: 34px;
    cursor: pointer;
`;