import { useState, useRef, useEffect, useContext } from "react";
import { putEdit } from "../service/api.service";
import ReactHashtag from "react-hashtag";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Edit({ text, id, editSelected, setEditSelect }) {
    const { userData, onChangePost, setOnChangePost } = useContext(UserContext);
    const [newText, setNewText] = useState(text);
    const [editDisabled, setEditDisabled] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        if (editSelected) {
          inputRef.current.focus();
        }
        setNewText(text);
      }, [editSelected]);

      function cancelEditOnEsc(e) {
        if (e.code === "Escape" && editSelected) {
          setEditSelect(false);
        }
        if (e.code === "Enter" && editSelected) {
          setEditDisabled(true);
          putEdit(newText, userData.token, id)
            .then((res) => {
              setEditDisabled(false);
              setEditSelect(false);
    
              if (onChangePost) {
                setOnChangePost(false);
              } else {
                setOnChangePost(true);
              }
            })
            .catch((err) => {
              setEditDisabled(false);
              alert("Não foi possível salvar as alterações!");
            });
        }
      }
    
      const edit = () => {
        if (editSelected) {
          return (
            <InputEditPost
              type="text"
              value={newText}
              ref={inputRef}
              onChange={(e) => setNewText(e.target.value)}
              onKeyUp={(e) => cancelEditOnEsc(e)}
              disabled={editDisabled}
            />
          );
        } else {
          return (
            <span>
              <ReactHashtag
                renderHashtag={(hashTagValue) => (
                  <Link
                    to={`/hashtag/${hashTagValue.replace("#", "").toLowerCase()}`}
                  >
                    <Hashtag>{hashTagValue}</Hashtag>
                  </Link>
                )}
              >
                {text}
              </ReactHashtag>
            </span>
          );
        }
      };

    return (
        <>
        {edit()}
        </>
    )
}

const Hashtag = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 700;
`;

const InputEditPost = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 7px;
  font-size: 14px;
  margin: 5px 0;
`;
