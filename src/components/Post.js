import styled from "styled-components";
import { colors } from "../globalStyles";
import { Link } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import DeleteModal from "./DeleteModal";
import RepostedBy from "./RepostedBy";
import Repost from "./Repost";
import notfound from "../assets/notfound.jpg";
import CommentIcon from "./CommentIcon";
import Comments from "./Comments";
import Likes from "./Likes";
import Edit from "./Edit";
import LinkPreview from "./LinkPreview";

export default function Post(props) {
  const {
    id,
    text,
    link,
    linkTitle,
    linkDescription,
    linkImage,
    user,
    likes,
    repostId,
    repostCount,
    repostedBy,
  } = props;
  const { username, avatar } = user;
  const { userData } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [myComment, setMyComment] = useState("");
  const [editSelected, setEditSelect] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  function image() {
    return linkImage === "" || linkImage === null ? notfound : linkImage;
  }

  return (
    <>
      {repostedBy !== undefined && (
        <RepostedBy repostedBy={repostedBy} userId={userData.user.id} />
      )}
      <Container>
        <SideBarPost>
          <Link to={`/user/${user.id}`}>
            <img src={avatar} alt="" />
          </Link>
          <Likes likes={likes} id={id} repostId={repostId} />
          <CommentIcon
            showComments={showComments}
            setShowComments={setShowComments}
            postId={id}
            postComments={postComments}
            setPostComments={setPostComments}
            myComment={myComment}
          />
          <Repost postId={id} repostCount={repostCount} />
        </SideBarPost>
        <ContentPost>
          <MsgPost>
            <div>
              <Link to={`/user/${user.id}`}>
                <span>{username}</span>
              </Link>
              <div>
                {user.id === userData.user.id && (
                  <>
                    <EditIcon onClick={() => setEditSelect(!editSelected)} />
                    <DeleteIcon onClick={() => setModalOpen(!modalOpen)} />
                  </>
                )}
              </div>
            </div>
            <Edit
              setEditSelect={setEditSelect}
              editSelected={editSelected}
              id={id}
              text={text}
            />
          </MsgPost>
          <LinkPreview
            previewModalOpen={previewModalOpen}
            setPreviewModalOpen={setPreviewModalOpen}
            title={linkTitle}
            link={link}
          />
          <LinkPost onClick={() => setPreviewModalOpen(true)}>
            <div>
              <span>{linkTitle}</span>
              <span>{linkDescription}</span>
              <p>{link}</p>
            </div>
            <img src={image()} alt="" />
          </LinkPost>
        </ContentPost>
        {modalOpen && (
          <DeleteModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            postId={id}
          />
        )}
      </Container>
      {showComments && (
        <Comments
          postComments={postComments}
          userId={user.id}
          postId={id}
          myComment={myComment}
          setMyComment={setMyComment}
        />
      )}
    </>
  );
}

const Container = styled.div`
  width: 611px;
  background-color: ${colors.black};
  border-radius: 16px;
  padding: 18px 18px 18px 11px;
  display: flex;
  color: ${colors.white};
  margin-top: 29px;
  position: relative;
  z-index: 2;

  @media (max-width: 1000px) {
    width: 100%;
    justify-content: center;
    margin: 20px 0 0 0;
    border-radius: 0;
  }
`;

const SideBarPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  max-width: 500px;
  cursor: pointer;

  div {
    margin: 15px 15px;

    * {
      font-size: 11px;
      color: #cecece;
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

    span:first-child {
      font-size: 16px;
      margin-bottom: 5px;
    }

    span:nth-child(2) {
      margin-bottom: 13px;
      color: #9b9595;
    }

    a {
      text-decoration: none;
      -webkit-line-clamp: 1;
    }
  }
  img {
    width: 154px;
    height: 100%;
    border-radius: 0 16px 16px 0;
  }
  @media (max-width: 1000px) {
    height: 115px;
    width: calc(100vw - 110px);
    img {
      width: 95px;
    }
  }
`;

const MsgPost = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 110px);
  max-width: 500px;

  span {
    margin-bottom: 15px;
    font-size: 19px;
    color: #cecece;
    word-wrap: break-word;
    word-break: break-all;
  }

  span:nth-child(2) {
    font-size: 17px;
    margin-top: 10px;
  }

  div {
    display: flex;
    justify-content: space-between;
  }
`;

const DeleteIcon = styled(MdDelete)`
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const ContentPost = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 502px;
  margin-left: 12px;
`;

const EditIcon = styled(MdModeEdit)`
  color: white;
  font-size: 16px;
  margin-right: 4px;
  cursor: pointer;
`;
