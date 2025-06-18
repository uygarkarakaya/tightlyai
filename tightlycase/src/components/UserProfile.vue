<template>
  <div class="user-profile" v-if="userData">
    <img :src="userProfileImg" class="user-profile-photo" />
    <span>{{ userData.name }}</span>
    <span>{{ userData.email }}</span>
    <span>{{ userData.phone }}</span>
    <span>{{ addressText }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import userProfileImg from "../assets/user-profile.svg";

const props = defineProps({
  userData: {
    type: Object,
    default: null,
  },
});

const addressText = computed(() => {
  const userAdress = props.userData?.address;
  return userAdress?.street + " " + userAdress?.suite + " " + userAdress?.city;
});
</script>

<style scoped>
.user-profile {
  display: flex;
  gap: 12px;
  flex-direction: column;
  border: 1px solid;
  padding: 1.5rem;
  border-radius: 6px;
  height: 90vh;
}

.user-profile-photo {
  width: 4rem;
  align-self: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
}
</style>
