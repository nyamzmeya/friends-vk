<template>
  <Card class="person">
    <template #header>
      <img alt="user header" :src="person.photo_200_orig" class="photo" />
    </template>
    <template #content>
      <div class="person_info">
        <div class="name">{{ person.last_name }} {{ person.first_name }}</div>

        <Button
          icon="pi pi-check"
          label="Добавить"
          class="p-button-sm"
          v-on:click="addPerson(person)"
          :loading="this.$store.getters.ADDISLOADING"
          :disabled="added"
        />
        <Button
          class="p-button-sm p-button-secondary"
          icon="pi pi-trash"
          label="Удалить"
          :disabled="deleteDis"
          v-on:click="deletePerson(person)"
        />
      </div>
    </template>
  </Card>
</template>

<style>
.photo {
  max-width: 200px;
}

.p-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.person {
  width: 200px;
  height: 100%;
}
.p-card-content,
.p-card-footer {
  padding: 0px !important;
}
.person_info {
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 10px;
}
</style>

<script>
export default {
  name: "Person",
  props: ["person", "deleteDisable"],
  computed: {
    added() {
      return this.person.added;
    },
    deleteDis() {
      return this.deleteDisable ? this.deleteDisable : !this.added;
    },
  },
  methods: {
    addPerson(person) {
      this.$store.dispatch("ADD_PERSON_TO_LIST", person);
      this.$store.commit("SET_CURRENTPERSON", null);
      this.$store.commit("SET_ALERT_SEARCH", {
        mes: "Пользователь добавлен в список!",
        type: "success",
      });
      setTimeout(() => this.$store.commit("SET_ALERT_SEARCH", null), 2000);
    },
    deletePerson(person) {
      this.$store.commit("DELETE_PERSON", person);
    },
  },
  data: () => ({}),
};
</script>
