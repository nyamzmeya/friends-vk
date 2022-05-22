<template>
  <DataView :value="posts" layout="list" class="posts">
    <template #header>Посты {{name}}</template>
    <template #list="{ data }">
      <Panel :header="data.date" v-if="data.text">
        {{data.text}}
      </Panel>
    </template>
  </DataView>
</template>


<script>
export default {
  name: "Posts",
  props: ["posts", "name"]
};
</script>

<style>
.posts {
  max-height: 500px;
  overflow: auto;
}
.posts .grid-nogutter {
  flex-direction: column;
  row-gap: 20px;
}
</style>

