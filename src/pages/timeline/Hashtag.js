import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getPostsByHashtag } from "../../service/api.service";
import UserContext from "../../contexts/UserContext";

export default function Hashtag() {
  const { hashtag } = useParams();
  const { user } = useContext(UserContext);
  const [hashtagPosts, setHashtagPosts] = useState({});

  useEffect(
    () =>
      getPostsByHashtag({ token: user.token }, hashtag).then((r) =>
        setHashtagPosts(r.data)
      ),
    []
  );
  return <>{hashtagPosts ? console.log(hashtagPosts) : ""}</>;
}
