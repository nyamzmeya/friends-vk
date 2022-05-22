<template>
  <Search />
  <Person v-if="person" :person="person"/>
</template>

<script>
import Search from './Search.vue';
import Person from './Person.vue';


export default {
  name: "Home",
  computed: {
    person() {
      return this.$store.getters.CURRENTPERSON;
    },
  },
  components: {
   Search,
   Person,
  }
};
</script>

<style scoped>

</style>