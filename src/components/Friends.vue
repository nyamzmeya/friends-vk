<template>
  <div v-if="friends.length != 0" class="card">
    <DataView
      @page="changePage"
      :value="friends"
      :paginator="true"
      layout="grid"
      :rows="4"
    >
      <template #header v-if="this.name">
        Друзья {{this.name}}
      </template>

      <template #grid="{ data }">
        <div class="card_item" @click="goToFriendInfo(data)" v-if="!this.friends_props">
          <div
            class="card_content"
            v-bind:style="{
              backgroundColor: `rgba(233, 233, 255, ${
                data.friend_of.length / all_persons 
              })`,
            }"
            style="width: 250px"
          >
            <div class="content">
              <img :src="data.photo_200_orig" />
              <div class="name">{{ data.first_name }} {{ data.last_name }}</div>
              <div>
                Пол:
                <Tag>{{
                  data.sex == 1 ? "Ж" : data.sex == 2 ? "М" : "Пол не указан"
                }}</Tag>
              </div>
              <div v-if="data.age">
                Возраст: <Tag>{{ data.age }}</Tag>
              </div>
              <div>
                Всего друзей: <Tag>{{ data.friendsNum }}</Tag>
              </div>
              <div>
                <i
                  class="pi pi-users mr-4 p-text-secondary"
                  style="font-size: 2rem"
                  v-badge="data.friend_of.length"
                  v-tooltip.bottom="
                    data.friend_of
                      .map(
                        (friend) => friend.first_name + ' ' + friend.last_name
                      )
                      .join(`\n`)
                  "
                ></i>
              </div>
            </div>
          </div>
        </div>

        <Person v-else :person="data" />
      </template>
    </DataView>
  </div>
  <Alert v-else mes="Пока друзей нет! Добавьте сначала пользователей" />
</template>

<script>
import Alert from "./Alert.vue";
import Person from "./Person.vue";

export default {
  components: { Alert, Person },
  name: "Friends",
  props: ["friends_props", "name"],
  mounted() {
    if (!this.friends_props) {
      this.$store.getters.FRIENDS.length != 0
        ? this.$store.dispatch("FETCH_FRIENDS_NUM", [0, 4])
        : null;
    }
  },

  computed: {
    friends() {
      return this.friends_props || this.$store.getters.FRIENDS;
    },
    all_persons() {
      return this.$store.getters.PERSONS.length;
    },
  },
  methods: {
    changePage(e) {
      console.log(e);
      this.$store.dispatch("FETCH_FRIENDS_NUM", [e.first, 4]);
    },
    goToFriendInfo(friend) {
      this.$router.push({ path: `/friend/${friend.id}`});
      this.$store.commit("SET_CURRENTFRIEND", friend);
    }
  },
};
</script>

<style>
.card {
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}

.card_content {
  height: 100%;
  padding: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}

.card_item {
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}

.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 10px;
}

.content img {
  max-height: 200px;
}
.name {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>