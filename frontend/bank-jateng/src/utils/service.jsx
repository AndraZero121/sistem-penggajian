import axios from "axios";

const setBaseUrl = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
}); 

export default setBaseUrl;