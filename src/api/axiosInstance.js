import axios from "axios";
import { BASE_URI } from "@env";

const instance = axios.create({
  baseURL: BASE_URI,
});

export default instance;
