<template>
  <DataTable
    :value="userStore.users"
    tableClass="p-datatable-gridlines"
    tableStyle="min-width:30rem;"
  >
    <Column>
      <template #header>
        <span class="user-table-header"> Users </span>
      </template>

      <template #body="slotProps">
        <span class="user-row" @click="userClicked(slotProps.data)">
          {{ slotProps.data.name }}
        </span>
      </template>
    </Column>
  </DataTable>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/store.js";

const userStore = useUserStore();

onMounted(async () => {
  userStore.loadUsers();
});

const userClicked = (user) => {
  console.log("user clicked", user);
};
</script>

<style scoped>
.user-row {
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.user-table-header {
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
