import axios from "axios";

export const api = axios.create({
  baseURL: "https://doit-api-ko89.onrender.com",
});
