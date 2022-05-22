<template>
<div v-for="person of persons" v-bind:key="person.id">
    <Person :person="person"/>
</div>
  <Alert :mes="alert.mes" v-if="alert" :type="alert.type"/>
</template>

<script>
import Alert from "./Alert.vue";
import Person from './Person.vue';
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