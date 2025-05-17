import axios from "axios";

const apiFetch = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default apiFetch;
