import axios from "axios";

import { decryptData } from "../../utilities/encryption";

import { BASE_URL } from "../../assets/constants";

const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.request.use(
    (config) => {
        const token = decryptData(localStorage.getItem("cookie"));
        // console.log(token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
