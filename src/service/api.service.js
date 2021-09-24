import axios from "axios";
const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/";

function setConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function registerUser(newUserData) {
  return axios.post(`${URL}sign-up`, newUserData);
}

function serverLogin(userData) {
  return axios.post(`${URL}sign-in`, userData);
}

function getTrending({ token }) {
  return axios.get(`${URL}hashtags/trending`, setConfig(token));
}

function getPosts(token) {
  return axios.get(`${URL}/posts`, setConfig(token));
}

function postLike(idPost, token) {
  return axios.post(`${URL}/posts/${idPost}/like`, "", setConfig(token));
}

function postUnlike(idPost, token) {
  return axios.post(`${URL}/posts/${idPost}/dislike`, "", setConfig(token));
}

function getUserPosts(id, { token }) {
  return axios.get(`${URL}users/${id}/posts`, setConfig(token));
}

function getPostsByHashtag({ token }, hashtag) {
  return axios.get(`${URL}/hashtags/${hashtag}/posts`, setConfig(token));
}

function createNewPost(body, token) {
  return axios.post(`${URL}posts`, body, setConfig(token));
}

function deletePost(id, token) {
  return axios.delete(`${URL}posts/${id}`, setConfig(token));
}

function getMyLikes({ token }) {
  return axios.get(`${URL}/posts/liked`, setConfig(token));
}

function putEdit(text, token, id) {
  const body = {
    text: text,
  };
  return axios.put(`${URL}/posts/${id}`, body, setConfig(token));
}

function userSearch(query, { token }) {
  return axios.get(`${URL}/users/search/?username=${query}`, setConfig(token));
}
function postFollow(id, token) {
  return axios.post(`${URL}/users/${id}/follow`, "", setConfig(token));
}

function postUnFollow(id, token) {
  return axios.post(`${URL}/users/${id}/unfollow`, "", setConfig(token));
}

function getFollows(token) {
  return axios.get(`${URL}/users/follows`, setConfig(token));
}

function repost(id, token) {
  return axios.post(`${URL}posts/${id}/share`, {}, setConfig(token))
}

export {
  registerUser,
  getTrending,
  serverLogin,
  getPosts,
  postLike,
  postUnlike,
  getUserPosts,
  createNewPost,
  getPostsByHashtag,
  deletePost,
  getMyLikes,
  putEdit,
  userSearch,
  postFollow,
  postUnFollow,
  getFollows,
  repost
};
