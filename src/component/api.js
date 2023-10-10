import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/user",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authorization");
    //  console.log(token);
    if (token) {
      config.headers.authorization = ` ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);  

export default api;





