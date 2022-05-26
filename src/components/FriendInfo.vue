<template>
  <Friends :friends_props="friends" :name="name" :deleteDisable="true"/>
  <Posts :posts="posts" :name="name"/>
</template>

<script>
import Friends from "./Friends.vue";
import Posts from './Posts.vue';
export default {
  name: "FriendInfo",
  components: { Friends, Posts },
   mounted() {
        this.$store.dispatch("GET_POSTS", this.$route.params.id);
    },
  computed: {
    friends() {
      let current_friend = this.$store.getters.FRIENDS.filter(friend => friend.id == this.$route.params.id);
      let current_friend_friends = this.$store.getters.PERSONS.filter(friend => {
        return current_friend[0].friend_of.map(friend => friend.id).includes(friend.id);
        });
      return current_friend_friends;
    },
    posts() {
      return this.$store.getters.POSTS;
    },
    name() {
      return this.$store.getters.CURRENTFRIEND.last_name + " " + this.$store.getters.CURRENTFRIEND.first_name;
    }
  },
  data: () => ({
    items: [
      { label: "Друзья", icon: "pi pi-fw pi-search", to: "/friend/:id" },
    ],
  }),
};
</script>