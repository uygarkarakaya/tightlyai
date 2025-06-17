import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchUsers } from "../services/service";

export const useUserStore = defineStore("user", () => {
  const users = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const loadUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await fetchUsers();
      console.log("data", data);
      users.value = data;
    } catch (err) {
      error.value = "Failed to fetch users: " + err;
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    users,
    loading,
    error,
    loadUsers,
  };
});
