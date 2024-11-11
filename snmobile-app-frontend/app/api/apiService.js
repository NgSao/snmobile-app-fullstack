import axios from "axios";

// const API_URL = "http://192.168.1.111:8080";
const API_URL = "https://9cbc-2405-4803-c860-45d0-a9ba-5d84-9e59-fb4b.ngrok-free.app";

function callApi(endpoint, method = "GET", body) {
    return axios({
        method,
        url: `${API_URL}/api/${endpoint}`,
        data: body,
    }).catch((e) => {
        console.log(e);
        throw e;
    });
}

export function GET_ALL(endpoint) {
    return callApi(endpoint, "GET");
}

export function GET_ID(endpoint, id) {
    return callApi(endpoint + "/" + id, "GET");
}

export function PUT_ID(endpoint, id, data) {
    return callApi(endpoint + "/" + id, "PUT", data);
}


export function POST_ADD(endpoint, data) {
    return callApi(endpoint, "POST", data);
}

export function DELETE_ID(endpoint, id) {
    return callApi(endpoint + "/" + id, "DELETE");
}

