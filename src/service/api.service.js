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
  return axios.get(`${URL}/posts`, setConfig(token));
}

function postLike(idPost, token) {
  return axios.post(`${URL}/posts/${idPost}/like`, '', setConfig(token));
}

function postUnlike(idPost, token) {
  return axios.post(`${URL}/posts/${idPost}/dislike`, '', setConfig(token))
}

function createNewPost(body, token){
  return axios.post(`${URL}posts`, body, setConfig(token))
}

export { 
  registerUser,
  getTrending,
  serverLogin,
  getPosts,
  postLike,
  postUnlike,
  createNewPost
};
