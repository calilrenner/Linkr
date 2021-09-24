import axios from "axios";
const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/";

function setConfig(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

const loadMoreHashTagPosts = (hashtag, firstPostId, token) => {
    return axios.get(`${URL}hashtags/${hashtag}/posts?olderThan=${firstPostId}`, setConfig(token));
}

const loadMoreUserPosts = (id, firstPostId, token) => {
    return axios.get(`${URL}users/${id}/posts?olderThan=${firstPostId}`, setConfig(token));
}



export {
    loadMoreHashTagPosts,
    loadMoreUserPosts
}

