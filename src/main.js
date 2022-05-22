import { createApp } from "vue";

import App from "./App.vue";
import Home from "./components/Home.vue";
import Persons from "./components/Persons.vue";
import Friends from "./components/Friends.vue";
import FriendInfo from "./components/FriendInfo.vue";

import store from "./store";

import { loadFonts } from "./plugins/webfontloader";
import PrimeVue from "primevue/config";
import "primeflex/primeflex.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-teal/theme.css";
import "primeicons/primeicons.css";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Button from "primevue/button";
import Message from "primevue/message";
import TabMenu from "primevue/tabmenu";
import DataView from "primevue/dataview";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Row from "primevue/row";
import Dropdown from "primevue/dropdown";
import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";
import Tooltip from "primevue/tooltip";
import Panel from 'primevue/panel';

import { createRouter, createWebHashHistory } from "vue-router";

loadFonts();

const app = createApp(App);

// vuex
app.use(store);
window.store = store;

// primevue
app.use(PrimeVue);
app.component("InputText", InputText);
app.component("Card", Card);
app.component("Button", Button);
app.component("Message", Message);
app.component("TabMenu", TabMenu);
app.component("DataView", DataView);
app.component("Badge", Badge);
app.component("Column", Column);
app.component("Tag", Tag);
app.component("Row", Row);
app.component("Panel", Panel);
app.component("Dropdown", Dropdown);
app.directive("badge", BadgeDirective);
app.directive("tooltip", Tooltip);

const routes = [
  { path: "/", component: Home },
  { path: "/persons", component: Persons },
  {
    path: "/friends",
    component: Friends,
  },
  { path: "/friend/:id", name: "friend", component: FriendInfo },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

app.use(router);

app.mount("#app");
