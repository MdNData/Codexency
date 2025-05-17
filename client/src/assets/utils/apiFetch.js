// utils/apiFetch.js
import axios from "axios";

const base = import.meta.env.VITE_API_URL || "/api";

const apiFetch = axios.create({
  baseURL: base,
  withCredentials: true,
});

export default apiFetch;
