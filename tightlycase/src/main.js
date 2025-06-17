import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator from "primevue/paginator";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const app = createApp(App);
const pinia = createPinia();
app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(pinia);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Paginator", Paginator);
app.component("InputText", InputText);
app.component("Button", Button);
app.mount("#app");
