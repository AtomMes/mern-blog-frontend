import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4444", //asumenq vor axiosy misht sran request ani
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");//asumenq vor sax zaprosneri het tokeny uxarki 

  return config;
});

export default instance;
