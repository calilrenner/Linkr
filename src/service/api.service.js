import axios from "axios";
const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/";

function setConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function getTrending({ token }) {
  return axios.get(`${URL}hashtags/trending`, setConfig(token));
}

function getPosts(token) {
  const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', setConfig(token));
  return promise;
}

export { 
  getTrending,
  getPosts
};
