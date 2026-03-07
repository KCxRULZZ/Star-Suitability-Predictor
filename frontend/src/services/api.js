import axios from "axios";

const API = axios.create({
  baseURL: "https://star-suitability-predictor.onrender.com",
});

export default API;