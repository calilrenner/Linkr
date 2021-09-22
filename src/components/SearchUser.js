import styled from "styled-components";
import { colors } from "../globalStyles";
import { IoIosSearch } from "react-icons/io";
import { useState, useContext, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import { userSearch } from "../service/api.service";
import UserContext from "../contexts/UserContext";

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
  return (
    <Container>
      <DebounceSearchField
        value={searchField}
        minLength={3}
        debounceTimeout={300}
        type="text"
        placeholder="Search for people and friends"
        onChange={(e) => setSearchField(e.target.value)}
      />
      <SearchIcon />
      {searchResult.length > 0 && searchField
        ? searchResult.map((user, index) => (
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
          ))
        : ""}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 10px;
  width: 560px;
  left: calc(50vw - 280px);
  display: flex;
  flex-direction: column;
  div:last-child {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  input:focus {
    outline: none;
  }
`;
const DebounceSearchField = styled(DebounceInput)`
  width: 100%;
  height: 45px;
  padding-left: 20px;
  font-size: 19px;
  border-radius: 8px;
  background-color: ${colors.white};
  border: none;
`;
const SearchIcon = styled(IoIosSearch)`
  position: absolute;
  right: 20px;
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
    color: ${colors.darkGrey};
    font-size: 19px;
    margin: 0 5px 0 10px;
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
