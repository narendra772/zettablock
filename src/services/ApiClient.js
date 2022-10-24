import axios from "axios";
import { baseUrl } from "./apis";

const apiClient = axios.create({
    baseURL: baseUrl,
    responseType: 'json',
});

export default apiClient;