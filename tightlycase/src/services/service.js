import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

//fetch users
export const fetchUsers = () => api.get("/users/");
