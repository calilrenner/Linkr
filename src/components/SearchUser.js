import styled from "styled-components";
import { colors } from "../globalStyles";
import { IoIosSearch } from "react-icons/io";
import { useState, useContext, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import { userSearch } from "../service/api.service";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function SearchUser() {
  const { userData } = useContext(UserContext);
  const [searchField, setSearchField] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (searchField.length > 2) {
      userSearch(searchField, { token: userData.token }).then((r) =>
        setSearchResult(r.data.users)
      );
    }
  }, [searchField]);

  function renderResult(user, index) {
    return (
      <Link to={`/user/${user.id}`}>
        <Result key={index}>
          <img src={user.avatar} alt={user.username + "'s avatar"} />
          <span>{user.username}</span>
          {user.isFollowingLoggedUser ? (
            <TextContainer>
              <Dot />
              <span>following</span>
            </TextContainer>
          ) : (
            ""
          )}
        </Result>
      </Link>
    );
  }

  return (
    <>
      {searchField.length > 2 ? (
        <BlockContent onClick={() => setSearchField("")} />
      ) : (
        ""
      )}
      <Container>
        <DebounceSearchField
          searching={searchField.length > 0}
          value={searchField}
          minLength={3}
          debounceTimeout={300}
          type="text"
          placeholder="Search for people and friends"
          onChange={(e) => setSearchField(e.target.value)}
        />
        <SearchIcon />
        {searchField.length > 2 && searchResult.length === 0 ? (
          <a>
            <Result>
              <span>Nenhum resultado...</span>
            </Result>
          </a>
        ) : (
          ""
        )}
        {searchResult.length > 0 && searchField
          ? searchResult.map((user, index) =>
              user.isFollowingLoggedUser ? renderResult(user, index) : ""
            )
          : ""}
        {searchResult.length > 0 && searchField
          ? searchResult.map((user, index) =>
              !user.isFollowingLoggedUser ? renderResult(user, index) : ""
            )
          : ""}
      </Container>
    </>
  );
}
const BlockContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div`
  position: absolute;
  z-index: 1;
  top: 10px;
  width: 560px;
  left: calc(50vw - 280px);
  display: flex;
  flex-direction: column;
  transition: height 3s;
  a:last-child div {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  input:focus {
    outline: none;
  }
  a {
    width: 100%;
  }
  @media (max-width: 1000px) {
    width: 350px;
    left: calc(50vw - 175px);
    top: 80px;
  }
`;
const DebounceSearchField = styled(DebounceInput)`
  width: 100%;
  height: 45px;
  padding-left: 20px;
  font-size: 19px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: ${(props) => (props.searching ? "0px" : "8px")};
  border-bottom-left-radius: ${(props) => (props.searching ? "0px" : "8px")};
  background-color: ${colors.white};
  border: none;
`;

const SearchIcon = styled(IoIosSearch)`
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 24px;
  color: ${colors.ligthGrey};
`;

const Result = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${colors.ligthGrey};
  display: flex;
  align-items: center;

  img {
    margin-left: 20px;
    width: 39px;
    height: 39px;
    border-radius: 35px;
  }

  span {
    max-width: 300px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${colors.darkGrey};
    font-size: 19px;
    margin: 0 5px 0 10px;
    @media (max-width: 1000px) {
      max-width: 170px;
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #c5c5c5;
    font-size: 19px;
  }
`;
const Dot = styled.div`
  margin: 5px 0 0 5px;
  width: 6px;
  height: 6px;
  background-color: #c5c5c5;
  border-radius: 10px;
`;
