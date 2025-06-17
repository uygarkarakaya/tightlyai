<template>
  <div class="user-detail-container">
    <div class="user-profile" v-if="userData">
      <span>{{ userData.name }}</span>
      <span>{{ userData.email }}</span>
      <span>{{ userData.phone }}</span>
      <span>{{ addressText }}</span>
    </div>
    <div class="posts">
      <span>Add a new post</span>
      <div class="post-input-row">
        <div class="post-input-box">
          <label for="post-title-input">Post title</label>
          <input id="post-title-input" type="text" v-model="newPostTitle" />
        </div>
        <div class="post-input-box">
          <label for="post-content-input">Post content</label>
          <input id="post-content-input" type="text" v-model="newPostContent" />
        </div>
        <button @click="addPosts()">Add</button>
      </div>
      <DataTable :value="postData" :showHeaders="false">
        <Column>
          <template #body="slotProps">
            {{ slotProps.data.title }}
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <button @click="deletePost(slotProps.data.id)">Delete</button>
          </template>
        </Column>
      </DataTable>
      <Paginator
        :first="first"
        :rows="rows"
        :totalRecords="totalRecords"
        @page="onPageChange"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "../stores/store.js";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();

const userId = route.params.id;
const userData = ref(null);
const postData = ref(null);
const newPostTitle = ref("");
const newPostContent = ref("");

const first = ref(0);
const rows = ref(3);
const totalRecords = ref(0);
const currentPage = ref(1);

const addressText = computed(() => {
  const userAdress = userData.value?.address;
  return userAdress?.street + " " + userAdress?.suite + " " + userAdress?.city;
});

onMounted(async () => {
  await userStore.loadUsers();
  await userStore.loadTotalPostsCount(userId);
  await loadPostsForPage(1);
  userData.value = userStore.getUserById(userId);
  postData.value = userStore.getPostsByUserId(userId);
  totalRecords.value = userStore.totalPosts;
});

const addPosts = async () => {
  if (isPostInputValid) {
    const body = {
      title: newPostTitle.value,
      body: newPostContent.value,
      userId: Number(userId),
    };
    await userStore.addNewPost(body);
    postData.value = userStore.getPostsByUserId(userId);
    newPostTitle.value = "";
    newPostContent.value = "";
    totalRecords.value = userStore.totalPosts;
  }
};

const deletePost = async (postId) => {
  await userStore.deletePostById(postId);
  postData.value = userStore.getPostsByUserId(userId);
  totalRecords.value = userStore.totalPosts;
  //if there is no other item in that page turn previous page
  if (postData.value.length === 0 && currentPage.value > 1) {
    await loadPostsForPage(currentPage.value - 1);
  }
};

const isPostInputValid = computed(() => {
  return newPostTitle.value && newPostContent.value;
});

const loadPostsForPage = async (page) => {
  currentPage.value = page;
  first.value = (page - 1) * rows.value;
  await userStore.loadPosts(page, userId);
  postData.value = userStore.getPostsByUserId(userId);
};

const onPageChange = (event) => {
  const page = Math.floor(event.first / event.rows) + 1;
  loadPostsForPage(page);
};
</script>
<style scoped>
.user-detail-container {
  display: flex;
  gap: 1rem;
  height: 100%;
  width: 100%;
}
.user-profile {
  display: flex;
  gap: 12px;
  flex-direction: column;
  border: 1px solid;
  padding: 1.5rem;
  border-radius: 6px;
}
.posts {
  border: 1px solid;
  padding: 1.5rem;
  border-radius: 6px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.post-input-row {
  display: flex;
  gap: 2rem;
}
.post-input-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
