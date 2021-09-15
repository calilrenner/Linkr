import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr";

function createNewPost(body){
    const request = axios.post(`${BASE_URL}/posts`, body);
    return request;
}

export {createNewPost};