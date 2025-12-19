import axios from "axios";

const userString = localStorage.getItem("USER_LOGIN");

// Chuyển chuỗi ngược lại thành Object
const user = userString ? JSON.parse(userString).accessToken : "";  

const AdminAPI = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api"
})

AdminAPI.interceptors.request.use((config) => {
    console.log(user);
    config.headers = {
        ...config.headers,
       TokenCybersoft : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk"
     ,  Authorization : `Bearer ${user}`
     }
  return config
})


export default AdminAPI;
