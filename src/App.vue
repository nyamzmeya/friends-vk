<template>
  <Panel header="Сервис анализа друзей ВК">
    <TabMenu :model="items" v-if="$route.name != 'friend'" />
    <router-view />
  </Panel>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    items: [
      { label: "Поиск пользователей", icon: "pi pi-fw pi-search", to: "/" },
      {
        label: "Список пользователей",
        icon: "pi pi-fw pi-users",
        to: "/persons",
      },
      {
        label: "Построить друзей",
        icon: "pi pi-fw pi-sitemap",
        to: "/friends",
      },
    ],
  }),
};
</script>

<style>
.p-dataview-content {
  margin-top: 20px;
}
.p-tabmenu {
  margin-bottom: 30px;
}
</style>
