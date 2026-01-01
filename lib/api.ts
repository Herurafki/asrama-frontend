import axios from "axios";

const api = axios.create({
    baseURL: "https://asramamiqu.site/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
})

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token"); // Ambil token
 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
      return config; 
  },
  (error) => {
     return Promise.reject(error);
   }
);

export default api;