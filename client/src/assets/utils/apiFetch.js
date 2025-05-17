import axios from "axios";

const apiFetch = axios.create({
  baseURL: "http://localhost:5101/api",
  withCredentials: true,
});

export default apiFetch;