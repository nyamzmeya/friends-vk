<template>
  <div class="persons">
    <div v-for="person of persons" v-bind:key="person.id">
      <Person :person="person" />
    </div>
  </div>
  <Alert :mes="alert.mes" v-if="alert" :type="alert.type" />
</template>

<script>
import Alert from "./Alert.vue";
import Person from "./Person.vue";
export default {
  components: { Alert, Person },
  name: "Persons",
  computed: {
    persons() {
      return this.$store.getters.PERSONS;
    },
    alert() {
      return this.$store.getters.ALERT_PERSONS;
    },
  },
};
</script>

<style>
.persons {
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1080px;
}
</style>