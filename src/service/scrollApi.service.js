import axios from "axios";
const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/";

function setConfig(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

const loadMorePosts = (firstPostId, token) => {
    return axios.get(`${URL}/posts?olderThan=${firstPostId}`, setConfig(token));
}

const loadMoreHashTagPosts = (hashtag, firstPostId, token) => {
    return axios.get(`${URL}hashtags/${hashtag}/posts?olderThan=${firstPostId}`, setConfig(token));
}

const loadMoreUserPosts = (id, firstPostId, token) => {
    return axios.get(`${URL}users/${id}/posts?olderThan=${firstPostId}`, setConfig(token));
}

const loadMoreLikedPosts = (firstPostId, token) => {
    return axios.get(`${URL}posts/liked?olderThan=${firstPostId}`, setConfig(token));
}

const loadMoreMyPosts = (id, firstPostId, token) => {
    return axios.get(`${URL}users/${id}/posts?olderThan=${firstPostId}`, setConfig(token));
}

export {
    loadMorePosts,
    loadMoreHashTagPosts,
    loadMoreUserPosts,
    loadMoreLikedPosts,
    loadMoreMyPosts
}

