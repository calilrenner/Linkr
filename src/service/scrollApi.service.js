import axios from "axios";
const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/";

function setConfig(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

const loadMorePosts = (firstPostId, token) => {
    return axios.get(`${URL}following/posts?olderThan=${firstPostId}`, setConfig(token));
}

const loadMoreHashTagPosts = (hashtag, firstPostId, token) => {
    return axios.get(`${URL}hashtags/${hashtag}/posts?olderThan=${firstPostId}`, setConfig(token));
}

const loadMoreUserPosts = (id, firstPostId, token) => {
    return axios.get(`${URL}users/${id}/posts?olderThan=${firstPostId}`, setConfig(token));
}

const loadMoreLikedPosts = (lastPostId, token) => {
    return axios.get(`${URL}posts/liked?earlierThan=${lastPostId}`, setConfig(token));
}

const loadMoreMyPosts = (id, firstPostId, token) => {
    return axios.get(`${URL}users/${id}/posts?olderThan=${firstPostId}`, setConfig(token));
}

function getMyLikesIds(firstPostId, token) {
    return axios.get(`${URL}posts/liked?earlierThan=${firstPostId - 1}`, setConfig(token));
  }

export {
    loadMorePosts,
    loadMoreHashTagPosts,
    loadMoreUserPosts,
    loadMoreLikedPosts,
    loadMoreMyPosts,
    getMyLikesIds
}

