import styled from "styled-components";
import { colors } from "../globalStyles";
import { Link } from "react-router-dom";
import { getTrending } from "../service/api.service";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Trending() {
  const { userData } = useContext(UserContext);
  const [hashtagInput, setHashtagInput] = useState("");
  const [trending, setTrending] = useState([]);

  useEffect(
    () =>
      getTrending({ token: userData.token }).then((r) => setTrending(r.data)),
    [userData.token]
  );
  return (
    <TrendingContainer>
      <div>
        <h1>trending</h1>
      </div>
      <ul>
        {trending.hashtags
          ? trending.hashtags.map((topic, index) => (
              <Link key={index} to={`/hashtag/${topic.name}`}>
                <li># {topic.name}</li>
              </Link>
            ))
          : ""}
      </ul>
      <StyledInput type="text" placeholder="type a hastag"></StyledInput>
      <StyledSpan>#</StyledSpan>
    </TrendingContainer>
  );
}

const TrendingContainer = styled.div`
  position: fixed;
  top: 150px;
  right: calc((100% - 937px) / 2);
  width: 301px;
  height: 406px;
  background-color: ${colors.black};
  border-radius: 15px;

  div {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${colors.darkGrey};
  }

  h1 {
    color: ${colors.white};
    font-size: 27px;
    font-weight: bold;
    font-family: "Oswald", sans-serif;
    margin-left: 15px;
  }

  ul {
    font-size: 19px;
    margin: 15px 0 0 15px;
  }

  li {
    margin-bottom: 8px;
    font-family: "Lato", sans-serif;
  }
  a {
    color: ${colors.white};
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledInput = styled.input`
  width: 269px;
  height: 35px;
  position: absolute;
  bottom: 18px;
  left: 16px;
  border: none;
  border-radius: 8px;
  background-color: #252525;
  padding-left: 35px;
  font-size: 16px;
  font-style: italic;
  font-weight: bold;
  color: ${colors.white};
  outline: none;
`;

const StyledSpan = styled.span`
  position: absolute;
  left: 25px;
  bottom: 27px;
  color: ${colors.white};
  font-size: 19px;
  font-weight: bold;
`;
