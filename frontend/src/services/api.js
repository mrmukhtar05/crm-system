import axios from "axios";

const API = axios.create({
  baseURL: "https://crm-system-production-dcea.up.railway.app/api",
});

export default API;