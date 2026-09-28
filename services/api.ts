import axios from "axios";

// Share one Axios instance instead of repeating axios.get() configuration.
const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 10000,
});

export default api;
