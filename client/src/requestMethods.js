import axios from "axios";

const BASE_URL = "http://localhost:5000/api/" 

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzBjZmVjZjk0OTdkYjJmMzFkOTMwYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNzEzNTI0MSwiZXhwIjoxNzA3Mzk0NDQxfQ.fO_hiZCBrg0z4hImuElt2ODDzMjzGlgfIHWqLm2SZs0";

export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

export const userRequest = axios.create({
    baseUrl : BASE_URL,
    headers:{token :`Bearer ${TOKEN}` },
});