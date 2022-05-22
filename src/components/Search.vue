<template>
  <div class="search">
    <InputText type="text" v-model="value" />
    <Button
      label="Поиск"
      icon="pi pi-check"
      :loading="this.$store.getters.ISLOADING"
      @click="getById"
    />
  </div>
  <Alert :mes="alert.mes" v-if="alert" :type="alert.type" />
</template>

<script>
import Alert from "./Alert.vue";
export default {
  components: {
    Alert,
  },
  name: "Search",
  data: () => ({
    value: null,
  }),
  computed: {
    alert() {
      return this.$store.getters.ALERT_SEARCH;
    },
  },

  methods: {
    getById() {
      this.$store.dispatch("GET_CURRENTPERSON", this.value);
    },
  },
};
</script>

<style>
.search {
  margin-bottom: 30px;
}
</style>
