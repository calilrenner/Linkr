import axios from "axios";
const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/";

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
  return axios.get(`${URL}posts`, setConfig(token));
}

function getUserPosts(id, token){
  return axios.get(`${URL}users/${id}/posts`, setConfig(token));
}

function getPostsByHashtag({ token }, hashtag) {
  return axios.get(`${URL}/hashtags/${hashtag}/posts`, setConfig(token));
}

function createNewPost(body, token) {
  return axios.post(`${URL}posts`, body, setConfig(token));
}

function putEdit(text, token, id) {
  const body = {
    text: text,
  }
  return axios.put(`${URL}/posts/${id}`, body, setConfig(token));
}

export {
  getTrending,
  serverLogin,
  registerUser,
  getPosts,
  getUserPosts,
  createNewPost,
  getPostsByHashtag,
  putEdit
};
