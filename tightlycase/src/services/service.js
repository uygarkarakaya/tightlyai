import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  headers: { "Content-type": "application/json; charset=UTF-8" },
});

//fetch users
export const fetchUsers = () => api.get("/users/");

//fetch posts
export const fetchPosts = (start = 0, limit = 3, userId) =>
  api.get(`/posts?userId=${userId}&?_start=${start}&_limit=${limit}`);

//add posts
export const addPost = (post) => api.post("/posts", post);

//delete posts
export const deletePost = (id) => api.delete(`/posts/${id}`);
