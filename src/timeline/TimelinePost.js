import styled from "styled-components";
import { colors } from "../globalStyles";
import { FiHeart } from 'react-icons/fi';

export default function TimelinePost(props) {

    const {
        text,
        link,
        linkTitle,
        linkDescription,
        linkImage,
        user,
        likes
    } = props;

    const {
        username,
        avatar
    } = user;


    return (
        <>
            <Container>
                <SideBarPost>
                    <img src={avatar} alt='' />
                    <div><FiHeart /></div>
                    <span>{likes.length === 1 ? `${likes.length} like` : `${likes.length} likes`}</span>
                </SideBarPost>
                <ContentPost>
                    <MsgPost>
                        <span>{username}</span>
                        <span>{text}</span>
                    </MsgPost>
                    <LinkPost>
                        <span>
                            <div>{linkTitle}</div>
                            <div>{linkDescription}</div>
                            <div>{link}</div>
                        </span>
                        <img src={linkImage} alt='' />
                    </LinkPost>
                </ContentPost>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 611px;
    height: 276px;
    background-color: ${colors.black};
    border: 1px solid #4D4D4D;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    color: ${colors.white};
    margin-bottom: 16px;
`;

const SideBarPost = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-right: 20px;

   img {
       width: 50px;
       height: 50px;
       margin-bottom: 19px;
       border-radius: 100%;
   }

   div {
       width: 20px;
       height: 19px;
   }

   span {
       font-size: 11px;
       margin-top: 4px
   }
`;

const LinkPost = styled.div`
display: flex;
border: 1px solid #4D4D4D;
border-radius: 16px;
width: 503px;
height: 155px;

   span {
       margin: 24px 19px;

       div:first-child {
        font-size: 16px;
        margin-bottom: 5px;
       }

       div:nth-child(2) {
        font-size: 11px;
        margin-bottom: 13px;
       }
       
       div:last-child {
           font-size: 11px;
       }
   }

   img {
       width: 153px;
       height: 100%;
       border-radius: 0 16px 16px 0;
   }
`;

const MsgPost = styled.div`
   display:flex;
   flex-direction: column;
    
        span{
            font-size: 19px;
            margin-bottom: 7px;
        }

        span:last-child {
            font-size: 17px;
        }
`;

const ContentPost = styled.div`
display:flex;
flex-direction: column;
justify-content: space-between;
`;