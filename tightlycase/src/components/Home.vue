<template>
  <DataTable :value="users">
    <Column header="Users">
      <template #body="slotProps">
        <span @click="userClicked(slotProps.data)">
          {{ slotProps.data.name }}
        </span>
      </template>
    </Column>
  </DataTable>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { fetchUsers } from "../services/service";
const users = ref([]);
onMounted(async () => {
  try {
    const { data } = await fetchUsers();
    console.log("data", data);
    users.value = data;
  } catch (err) {
    message.value = "Error fetching users";
  }
});

const userClicked = (user) => {
  console.log("user clicked", user);
};
</script>

<style scoped></style>
