import axios from "axios";
import { env } from "@env/client.mjs";

const api = axios.create({
 baseURL: env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
});

export default api;