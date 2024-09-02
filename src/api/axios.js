import { default as axios } from "axios";
import { axiosConfig } from "./config";

const api = axios.create(axiosConfig);

export default api;
