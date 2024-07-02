import { getBackendUrl } from "@/lib/config";
import axios from "axios";

const api = axios.create({
  baseURL: getBackendUrl(),
  withCredentials: true,
});

export default api;
