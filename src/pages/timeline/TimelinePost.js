import styled from "styled-components";
import { colors } from "../../globalStyles";
import { FiHeart } from 'react-icons/fi';
import { Link } from "react-router-dom";
import ReactHashtag from "react-hashtag";
import UserContext from "../../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { postLike } from "../../service/api.service";
import { FaHeart } from 'react-icons/fa';
import { postUnlike } from "../../service/api.service";
import ReactTooltip from "react-tooltip";

export default function TimelinePost(props) {

    const {
        id,
        text,
        link,
        linkTitle,
        linkDescription,
        linkImage,
        user,
        likes,
        setOnChangeLike,
    } = props;

    const {
        username,
        avatar
    } = user;

    const { 
        userData
    } = useContext(UserContext);
    
    // const token = '4b02619a-8c75-4a0a-937b-42b2620e1eb0'
    // const userData.user = {
    //     "id": 621,
    //     "email": "calil@driven.com",
    //     "username": "banana",
    //     "avatar": "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/621/avatar"
    //   };


    const [usersLikesArray, setUsersLikesArray] = useState([...likes.map(user => user.userId)]);
    useEffect(() => {
        setUsersLikesArray([...likes.map(user => user.userId)]);

    }, [likes])
    const [like, setLike] = useState(usersLikesArray.includes(userData.user.id) ? true : false);
    const [likesArrayLength, setLikesArrayLength] = useState(likes.length)
    const [likesArrayId, setLikesArrayId] = useState([])
    const [arrayToolTipId, setArrayToolTipId] = useState([])
    const [arrayToolTipMyLike, setArrayToolTipMyLike] = useState([])
    const [arrayToolTipAllLikes, setArrayToolTipAllLikes] = useState([])
    const [toolTipMyMsg, setToolTipMyMsg] = useState('')
    const [toolTipMsg, setToolTipMsg] = useState('');

    let teste;
    let teste2;
    let teste3;
    const [teste4, setTeste4] = useState('')
    useEffect(() => {
        teste = likes.map(names => names['user.username']);
        teste2 = likes.map(ids => ids.userId)

        if(teste.length === 1) {
            teste3 = teste[0]

            if(teste2.includes(userData.user.id)) {
                teste3 = 'Você' 
            }

        } else if (teste.length === 2) {
            teste3 = `${teste[0]} e ${teste[1]}`

            if(teste2.includes(userData.user.id)) {
                teste2 = teste2.filter(ids => ids !== userData.user.id)
                teste = likes.filter((id => teste2.indexOf(id.userId) > -1))
                teste3 = `Você e ${teste[0]['user.username']}` 
            }
        } else if (teste.length === 3) {
            teste3 = `${teste[0]}, ${teste[1]} e outra pessoa`

            if(teste2.includes(userData.user.id)) {
                teste2 = teste2.filter(ids => ids !== userData.user.id)
                teste = likes.filter((id => teste2.indexOf(id.userId) > -1))
                teste3 = `Você, ${teste[0]['user.username']} e outra pessoa` 
            }
        } else if (teste.length >= 4) {
            teste3 = `${teste[0]}, ${teste[1]} e outras ${teste.length - 2} pessoas`

            if(teste2.includes(userData.user.id)) {
                teste2 = teste2.filter(ids => ids !== userData.user.id)
                teste = likes.filter((id => teste2.indexOf(id.userId) > -1))
                teste3 = `Você, ${teste[0]['user.username']} e outras ${teste.length - 1} pessoas` 
            }
        }
        setTeste4(teste3)
    }, [likes]);
    console.log(teste4)

    function hoverLikes() {
       
    }

    function isliked() {
        if(!like) {
            setLike(true);
            postLike(id, userData.token).then(res => setLikesArrayLength(res.data.post.likes.length));
            setOnChangeLike(true);
        } 
        
        if(like) {
            setLike(false);
            postUnlike(id, userData.token).then(res => setLikesArrayLength(res.data.post.likes.length));
            setOnChangeLike(false);
        }
    }

    return (
        <>
            <Container>
                <SideBarPost>
                    <Link to={`/user/${id}`}><img src={avatar} alt='' /></Link>
                    <div onClick={isliked} onMouseOver={hoverLikes} data-tip={teste4}>
                        {like ? <FaHeart color='red'/> : <FiHeart />}
                        <ReactTooltip />
                    </div>
                    <span>{likesArrayLength === 1 ? `${likesArrayLength} like` : `${likesArrayLength} likes`}</span>
                </SideBarPost>
                <ContentPost>
                    <MsgPost>
                        <Link to={`/user/${id}`}><span>{username}</span></Link>
                        <span>
                            <ReactHashtag renderHashtag={(hashTagValue) => (
                                <Hashtag href={`/hashtag/${hashTagValue.replace('#', '')}`}>{hashTagValue}</Hashtag>
                            )}>
                                {teste4 ? teste4 : text}
                            </ReactHashtag>
                        </span>

                    </MsgPost>
                    <LinkPost>
                        <span>
                            <div>{linkTitle}</div>
                            <div>{linkDescription}</div>
                            <a href={link} target='_blank' rel="noreferrer">{link}</a>
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
    margin: 29px 0;

    @media (max-width: 1000px) {
        width: 100vw;
        height: 60vw;
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
height: 155px;
width: 100%;

   span {
       margin: 24px 19px;
       min-width: 0;

       div:first-child {
        font-size: 16px;
        margin-bottom: 5px;
        color: #CECECE;
        display: block;
        display: -webkit-box;
        -webkit-line-clamp: 1; 
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        text-overflow: -o-ellipsis-lastline;
        overflow-wrap: break-word;
        word-wrap: break-word;
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
       }

       div:nth-child(2) {
        font-size: 11px;
        margin-bottom: 13px;
        color: #9B9595;
        display: block;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        text-overflow: -o-ellipsis-lastline;
        overflow-wrap: break-word;
        word-wrap: break-word;
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
       }
       
       a {
           font-size: 11px;
           text-decoration: none;
           color: #CECECE;
           display: block;
            display: -webkit-box;
            -webkit-line-clamp: 1; 
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            text-overflow: -o-ellipsis-lastline;
            overflow-wrap: break-word;
            word-wrap: break-word;
            -webkit-hyphens: auto;
            -ms-hyphens: auto;
            hyphens: auto;
       }
   }

   img {
       width: 40%;
       height: 100%;
       border-radius: 0 16px 16px 0;
   }

   @media (max-width: 1000px) {
       height: 65%;
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
            display: block;
            display: -webkit-box;
            -webkit-line-clamp: 1; 
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            text-overflow: -o-ellipsis-lastline;
            overflow-wrap: break-word;
            word-wrap: break-word;
            -webkit-hyphens: auto;
            -ms-hyphens: auto;
            hyphens: auto;
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
`;