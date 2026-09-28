import axios from "axios";

// إنستنس واحد نستخدمه بكل مكان بدل ما نكرر axios.get() بكل ملف
const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

export default api;
