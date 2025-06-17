import { defineStore } from "pinia";
import { ref } from "vue";
import {
  fetchUsers,
  fetchPosts,
  fetchUserPostsCount,
  addPost,
  deletePost,
} from "../services/service";

export const useUserStore = defineStore("user", () => {
  const users = ref([]);
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const totalPosts = ref(0);
  const pageSize = 3;
  const currentPage = ref(1);

  const loadUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await fetchUsers();
      users.value = data;
    } catch (err) {
      error.value = "Failed to fetch users: " + err;
    } finally {
      loading.value = false;
    }
  };

  const loadTotalPostsCount = async (userId) => {
    try {
      const { data } = await fetchUserPostsCount(userId);
      totalPosts.value = data.length;
    } catch (err) {
      error.value = "Failed to fetch total posts: " + err;
    }
  };

  const loadPosts = async (page = 1, userId) => {
    loading.value = true;
    error.value = null;
    try {
      const start = (page - 1) * pageSize;
      const { data } = await fetchPosts(start, pageSize, userId);
      posts.value = data;
      currentPage.value = page;
    } catch (err) {
      error.value = "Failed to fetch posts: " + err;
    } finally {
      loading.value = false;
    }
  };

  const getUserById = (id) => {
    return users.value.find((u) => String(u.id) === id);
  };

  const getPostsByUserId = (userId) => {
    return posts.value;
  };

  const addNewPost = async (post) => {
    try {
      const { data } = await addPost(post);
      posts.value.unshift(data);
      totalPosts.value += 1;
    } catch (err) {
      error.value = "Failed to add post: " + err;
    }
  };

  const deletePostById = async (id) => {
    try {
      await deletePost(id);
      posts.value = posts.value.filter((post) => post.id !== id);
      totalPosts.value -= 1;
    } catch (err) {
      error.value = "Failed to delete post: " + err;
    }
  };

  return {
    users,
    loading,
    error,
    totalPosts,
    loadUsers,
    loadPosts,
    loadTotalPostsCount,
    getUserById,
    getPostsByUserId,
    addNewPost,
    deletePostById,
  };
});
