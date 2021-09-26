import { postLike, postUnlike } from "../service/api.service";
import { FaHeart } from "react-icons/fa";
import UserContext from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { FiHeart } from "react-icons/fi";

export default function Likes({ likes, id, repostId }) {

    let likeId;

    if(repostId) {
        likeId = repostId;
    } else {
        likeId = id;
    }

    const { userData, onChangePost, setOnChangePost } = useContext(UserContext);
    const [usersLikesArray, setUsersLikesArray] = useState([
        ...likes.map((user) => user.userId),
    ]);
    const [like, setLike] = useState(
        usersLikesArray.includes(userData.user.id) ? true : false
    );
    const [likesArrayLength, setLikesArrayLength] = useState(likes.length);
    const [actualLikes, setActualLikes] = useState(likes);
    const [toolTipMsg, setToolTipMsg] = useState("");

    useEffect(() => {
        setUsersLikesArray([...likes.map((user) => user.userId)]);
    }, [likes]);

    function isliked() {
        if (!like) {
            setLike(true);
            postLike(likeId, userData.token).then((res) => {
                setLikesArrayLength(res.data.post.likes.length);
                setActualLikes(res.data.post.likes);
            });
            setOnChangePost(true);
        }

        if (like) {
            setLike(false);
            postUnlike(likeId, userData.token).then((res) => {
                setLikesArrayLength(res.data.post.likes.length);
                setActualLikes(res.data.post.likes);
            });
            setOnChangePost(false);
        }
    }

    useEffect(() => {
        let toolTipUsersNames;
        let toolTipUsersIds;
        let preToolTipMsg;

        toolTipUsersNames = actualLikes.map((names) =>
            names.username ? names.username : names["user.username"]
        );
        toolTipUsersIds = actualLikes.map((ids) => ids.userId);

        if (toolTipUsersNames.length === 1) {
            preToolTipMsg = toolTipUsersNames[0];

            if (toolTipUsersIds.includes(userData.user.id)) {
                preToolTipMsg = "Você";
            }
        } else if (toolTipUsersNames.length === 2) {
            preToolTipMsg = `${toolTipUsersNames[0]} e ${toolTipUsersNames[1]}`;

            if (toolTipUsersIds.includes(userData.user.id)) {
                toolTipUsersIds = toolTipUsersIds.filter(
                    (ids) => ids !== userData.user.id
                );
                toolTipUsersNames = likes.filter(
                    (id) => toolTipUsersIds.indexOf(id.userId) > -1
                );
                preToolTipMsg = `Você e ${toolTipUsersNames[0]["user.username"]}`;
            }
        } else if (toolTipUsersNames.length === 3) {
            preToolTipMsg = `${toolTipUsersNames[0]}, ${toolTipUsersNames[1]} e outra pessoa`;

            if (toolTipUsersIds.includes(userData.user.id)) {
                toolTipUsersIds = toolTipUsersIds.filter(
                    (ids) => ids !== userData.user.id
                );
                toolTipUsersNames = likes.filter(
                    (id) => toolTipUsersIds.indexOf(id.userId) > -1
                );
                preToolTipMsg = `Você, ${toolTipUsersNames[0]["user.username"]} e outra pessoa`;
            }
        } else if (toolTipUsersNames.length >= 4) {
            preToolTipMsg = `${toolTipUsersNames[0]}, ${toolTipUsersNames[1]
                } e outras ${toolTipUsersNames.length - 2} pessoas`;

            if (toolTipUsersIds.includes(userData.user.id)) {
                toolTipUsersIds = toolTipUsersIds.filter(
                    (ids) => ids !== userData.user.id
                );
                toolTipUsersNames = likes.filter(
                    (id) => toolTipUsersIds.indexOf(id.userId) > -1
                );
                preToolTipMsg = `Você, ${toolTipUsersNames[0]["user.username"]
                    } e outras ${toolTipUsersNames.length - 1} pessoas`;
            }
        }
        setToolTipMsg(preToolTipMsg);
    }, [actualLikes]);

    return (
        <>
            <div onClick={isliked} data-tip={toolTipMsg}>
                {like ? <FaHeart color="red" cursor="pointer" /> : <FiHeart cursor="pointer" />}
                <ReactTooltip />
            </div>
            <span>
                {likesArrayLength === 1
                ? `${likesArrayLength} like`
                : `${likesArrayLength} likes`}
            </span>
        </>
    )
}
