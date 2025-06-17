import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const app = createApp(App);

app.use(PrimeVue);

app.component("DataTable", DataTable);
app.component("Column", Column);
app.mount("#app");
