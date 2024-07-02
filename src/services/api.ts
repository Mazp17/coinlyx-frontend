import { getBackendUrl } from "@/lib/config";
import axios from "axios";

const api = axios.create({
  baseURL: getBackendUrl(),
  withCredentials: false,
});

export default api;
