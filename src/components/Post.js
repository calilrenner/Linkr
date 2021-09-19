import styled from "styled-components";
import { colors } from "../globalStyles";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import ReactHashtag from "react-hashtag";

export default function Post(props) {
  const { text, link, linkTitle, linkDescription, linkImage, user, likes } =
    props;

  const { username, avatar, id } = user;

  return (
    <>
      <Container>
        <SideBarPost>
          <Link to={`/user/${id}`}>
            <img src={avatar} alt="" />
          </Link>
          <FiHeart />
          <span>
            {likes.length === 1
              ? `${likes.length} like`
              : `${likes.length} likes`}
          </span>
        </SideBarPost>
        <ContentPost>
          <MsgPost>
            <Link to={`/user/${id}`}>
              <span>{username}</span>
            </Link>
            <span>
              <ReactHashtag
                renderHashtag={(hashTagValue) => (
                  <Link to={`/hashtag/${hashTagValue.replace("#", "")}`}>
                    <Hashtag>
                      {hashTagValue}
                    </Hashtag>
                  </Link>
                )}
              >
                {text}
              </ReactHashtag>
            </span>
          </MsgPost>
          <LinkPost>
            <span>
              <div>{linkTitle}</div>
              <div>{linkDescription}</div>
              <div>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </div>
            </span>
            <div>
              <img src={linkImage} alt="" />
            </div>
          </LinkPost>
        </ContentPost>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 611px;
  height: 276px;
  background-color: ${colors.black};
  border: 1px solid #4d4d4d;
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
    margin-top: 4px;
  }
`;

const LinkPost = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #4d4d4d;
  border-radius: 16px;
  height: 155px;
  width: 100%;

  > *: first-child {
    width: 60%;
    margin: 24px 19px;

    div:first-child {
      width: 100%;
      font-size: 16px;
      margin-bottom: 5px;
      color: #cecece;
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
      word-break: break-all;
      -webkit-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
    }

    div:nth-child(2) {
      width: 100%;
      font-size: 11px;
      margin-bottom: 13px;
      color: #9b9595;
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
      word-break: break-all;
      -webkit-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
    }


    div:nth-child(3) {
      width: 100%;
    }
    
    a {
      font-size: 11px;
      text-decoration: none;
      color: #cecece;
      display: inline-block;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      text-overflow: -o-ellipsis-lastline;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-all;
      line-break: auto;
    }
  }

  > *:last-child {
    width: 40%;
    heigth: 100%;
    border-radius: 0 16px 16px 0;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 0 16px 16px 0;
  }

  @media (max-width: 1000px) {
    height: 65%;
  }
`;

const MsgPost = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 19px;
    margin-bottom: 7px;
  }

  span:last-child {
    font-size: 17px;
    color: #cecece;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Hashtag = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 700;
`;
