import styled from "styled-components";
import { colors } from "../globalStyles";
import { Link } from "react-router-dom";
import { getTrending } from "../service/api.service";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Trending() {
  const { userData } = useContext(UserContext);

  const [trending, setTrending] = useState([]);

  useEffect(
    () => getTrending({ token: userData.token }).then((r) => setTrending(r.data)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <TrendingContainer>
      <div>
        <h1>trending</h1>
      </div>
      <ul>
        {trending.hashtags
          ? trending.hashtags.map((topic, index) => (
              <Link key={index} to={`/hashtag/:${topic.name}`}>
                <li># {topic.name}</li>
              </Link>
            ))
          : ""}
      </ul>
    </TrendingContainer>
  );
}

const TrendingContainer = styled.div`
  position: fixed;
  top: 211px;
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
    margin: 20px 0 0 15px;
  }

  li {
    margin-bottom: 10px;
  }
  a {
    color: ${colors.white};
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;
