import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getItems = async (type = "clothes", params = {}) => {
  const res = await api.get(`/${type}`, { params });
  return res.data;
};