import styled from "styled-components";
import { colors } from "../globalStyles";
import { Link } from "react-router-dom";

export default function Trending() {
  const trending = {
    hashtags: [
      {
        id: 2,
        name: "respondeai",
        numberOfMentions: 1,
      },
      {
        id: 1,
        name: "rickroll",
        numberOfMentions: 3,
      },
      {
        id: 3,
        name: "rickroll",
        numberOfMentions: 5,
      },
      {
        id: 4,
        name: "rickroll",
        numberOfMentions: 4,
      },
    ],
  };

  return (
    <TrendingContainer>
      <div>
        <h1>trending</h1>
      </div>
      <ul>
        {trending.hashtags.map((topic) => (
          <Link to={`/hashtag/:${topic.name}`}>
            <li># {topic.name}</li>
          </Link>
        ))}
      </ul>
    </TrendingContainer>
  );
}

const TrendingContainer = styled.div`
  position: fixed;
  top: 100px;
  left: calc(100vw - 500px);
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
  @media (max-width: 614px) {
    display: none;
  }
`;
