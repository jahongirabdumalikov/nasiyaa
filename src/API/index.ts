import axios from "axios";

const API = axios.create({
  baseURL: "https://nasiya.takedaservice.uz/api/",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access_token");
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
