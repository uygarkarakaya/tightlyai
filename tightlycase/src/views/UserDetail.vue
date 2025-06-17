<template>
  <div class="user-profile" v-if="userData">
    <span>{{ userData.name }}</span>
    <span>{{ userData.email }}</span>
    <span>{{ userData.phone }}</span>
    <span>{{ addressText }}</span>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import { useUserStore } from "../stores/store.js";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();

const userId = route.params.id;
const userData = ref(null);
const addressText = computed(() => {
  console.log("userdata", userData);
  const userAdress = userData.value?.address;
  return userAdress?.street + userAdress?.suite + userAdress?.city;
});

onMounted(async () => {
  await userStore.loadUsers();
  userData.value = userStore.getUserById(userId);
  console.log("userdata", userData.value);
});
</script>
<style scoped>
.user-profile {
  height: 100%;
  display: flex;
  gap: 12px;
  flex-direction: column;
  border: 1px solid;
  padding: 1.5rem;
  border-radius: 6px;
}
</style>
