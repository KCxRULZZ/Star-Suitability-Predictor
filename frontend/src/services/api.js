import axios from "axios";

const API = axios.create({
  baseURL: "https://star-suitability-predictor-production.up.railway.app",
});

export default API;