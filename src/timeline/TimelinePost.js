import styled from "styled-components";
import { colors } from "../globalStyles";
import { FiHeart } from 'react-icons/fi';
import { Link } from "react-router-dom";
import ReactHashtag from "react-hashtag";

export default function TimelinePost(props) {

    const {
        id,
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
                    <Link to={`/user/${id}`}><img src={avatar} alt=''/></Link>
                    <div><FiHeart /></div>
                    <span>{likes.length === 1 ? `${likes.length} like` : `${likes.length} likes`}</span>
                </SideBarPost>
                <ContentPost>
                    <MsgPost>
                        <span>{username}</span>
                        <span>
                        <ReactHashtag renderHashtag={(hashTagValue) => (
                            <Hashtag href={`/hashtag/${hashTagValue.replace('#', '')}`}>{hashTagValue}</Hashtag>
                        )}> 
                        {text}
                        </ReactHashtag>
                        </span>
                        
                    </MsgPost>
                    <LinkPost>
                        <span>
                            <div>{linkTitle}</div>
                            <div>{linkDescription}</div>
                            <a href={link} target='_blank'>{link}</a>
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
    min-height: 276px;
    background-color: ${colors.black};
    border: 1px solid #4D4D4D;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    color: ${colors.white};
    margin: 29px 0;

    @media (max-width: 1000px) {
        width: 100%;
        border-radius: 0;
    }
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

   span {
       font-size: 11px;
       margin-top: 4px
   }
`;

const LinkPost = styled.div`
display: flex;
justify-content: space-between;
border: 1px solid #4D4D4D;
border-radius: 16px;
min-height: 155px;
width: 503px;

   span {
       margin: 24px 19px;

       div:first-child {
        font-size: 16px;
        margin-bottom: 5px;
        color: #CECECE;
       }

       div:nth-child(2) {
        font-size: 11px;
        margin-bottom: 13px;
        color: #9B9595;
       }
       
       a {
           font-size: 11px;
           text-decoration: none;
           color: #CECECE;
       }
   }

   img {
       width: 153px;
       height: 100%;
       border-radius: 0 16px 16px 0;
   }

   @media (max-width: 1000px) {
    //    width: 100%;
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
            color: #CECECE;
        }
`;

const ContentPost = styled.div`
display:flex;
flex-direction: column;
justify-content: space-between;
`;

const Hashtag = styled.a`
        color: white;
        text-decoration: none;
        font-weight: 700;
`