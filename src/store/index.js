import { jsonp } from "vue-jsonp";
import { createStore } from "vuex";
import api from "../api.js";

function getAge(dateString) {
  if (dateString.length < 9) {
    return null;
  }
  let today = new Date();
  let birthDate = new Date(dateString.substring(dateString.length - 4));
  let age = today.getFullYear() - birthDate.getFullYear();
  return age;
}

function getDate(unix) {
  let date = new Date(unix * 1000);
  return date.getFullYear() + "." + date.getMonth() + "." + date.getDate();
}

export default createStore({
  state: {
    currentPerson: null,
    persons: [],
    friends: [],
    isLoading: false,
    alert_persons: {mes: "Добавленных пользователей пока нет!", type: "warn"},
    alert_search: null,
    currentFriend: null,
    friend_posts: null,
    addIsLoading: false,
  },
  getters: {
    CURRENTPERSON: (state) => {
      return state.currentPerson;
    },
    PERSONS: (state) => {
      return state.persons;
    },
    ISLOADING: (state) => {
      return state.isLoading;
    },
    ADDISLOADING: (state) => {
      return state.addIsLoading;
    },
    ALERT_SEARCH: (state) => {
      return state.alert_search;
    },
    ALERT_PERSONS: (state) => {
      return state.alert_persons;
    },
    FRIENDS: (state) => {
      return state.friends;
    },
    POSTS: (state) => {
      return state.friend_posts;
    },
    CURRENTFRIEND: (state) => {
      return state.currentFriend;
    },
  },
  mutations: {
    SET_CURRENTPERSON: (state, payload) => {
      state.currentPerson = payload;
    },
    ADD_PERSON: (state, payload) => {
      payload.added = true;
      state.persons.push(payload);
      state.alert_persons = null;
    },
    SET_LOADING: (state, payload) => {
      state.isLoading = payload;
    },
    SET_ADD_LOADING: (state, payload) => {
      state.addIsLoading = payload;
    },
    SET_ALERT_SEARCH: (state, payload) => {
      state.alert_search = payload;
    },
    SET_ALERT_PERSONS: (state, payload) => {
      state.alert_persons = payload;
    },
    DELETE_PERSON: (state, payload) => {
      if (state.currentPerson == payload) {
        state.currentPerson = null;
      }
      state.persons = state.persons.filter((person) => person.id != payload.id);
      state.friends = state.friends.filter(
        (friend) =>
          friend.friend_of.length != 1 && friend.friend_of[0].id != payload.id
      );
      state.alert_persons = {
        mes: "Пользователь удален из списка!",
        type: "success",
      };
      state.alert_search = null;
    },
    ADD_FRIENDS: (state, payload) => {
      payload[0].forEach((element) => {
        let index = state.friends.findIndex(
          (friend) => friend.id == element.id
        );
        if (index != -1) {
          state.friends[index].friend_of.push(payload[1]);
        } else {
          element.friend_of = [];
          element.friend_of.push(payload[1]);
          state.friends.push(element);
        }
      });
      state.friends = state.friends.sort((a, b) =>
        a.last_name > b.last_name
          ? 1
          : a.last_name === b.last_name
          ? a.first_name > b.first_name
            ? 1
            : -1
          : -1
      );
    },
    ADD_FRIENS_NUM: (state, payload) => {
      for (let j = 0; j <= payload[1].length - 1; j++) {
        state.friends[payload[0] + j].friendsNum = payload[1][j];
        state.friends[payload[0] + j].age = state.friends[payload[0] + j].bdate
          ? getAge(state.friends[payload[0] + j].bdate)
          : null;
      }
    },
    SET_CURRENTFRIEND: (state, payload) => {
      state.currentFriend = payload;
    },
    ADD_FRIEND_POSTS: (state, payload) => {
      state.friend_posts = payload;
    },
  },
  actions: {
    GET_CURRENTPERSON: async (context, id) => {
      context.commit("SET_LOADING", true);
      let data = await api.getCurrentPerson(id);

      if (data.response.length == 0) {
        context.commit("SET_ALERT_SEARCH", {
          mes: "Упс! Кажется пользователя с таким id не существует",
          type: "warn",
        });
        context.commit("SET_CURRENTPERSON", null);
        context.commit("SET_LOADING", false);
        return;
      }
      if (data.response[0].deactivated == "deleted" || data.response[0].deactivated == "banned") {
        context.commit("SET_ALERT_SEARCH", {
          mes: "Упс! Кажется пользователь с таким id удален или забанен",
          type: "warn",
        });
        context.commit("SET_CURRENTPERSON", null);
        context.commit("SET_LOADING", false);
        return;
      }
      if (data.response[0].is_closed) {
        context.commit("SET_ALERT_SEARCH", {
          mes: "Упс! Кажется профиль пользователя закрыт и мы не сможем добавить его друзей",
          type: "warn",
        });
        context.commit("SET_CURRENTPERSON", null);
        context.commit("SET_LOADING", false);
        return;
      }
      if (context.state.persons.map(person => person.id).includes(data.response[0].id)) {
        context.commit("SET_ALERT_SEARCH", {
          mes: "Пользователь с таким id уже добавлен!",
          type: "warn",
        });
        context.commit("SET_CURRENTPERSON", null);
        context.commit("SET_LOADING", false);
        return;
      }
      context.commit("SET_ALERT_SEARCH", null);
      context.commit("SET_CURRENTPERSON", data.response[0]);
      context.commit("SET_LOADING", false);
    },
    ADD_PERSON_TO_LIST: async (context, person) => {
      context.commit("ADD_PERSON", person);
      context.commit("SET_ADD_LOADING", true);

      let data = await api.getUserFriends(person.id);
      if (data.response.items.length != 0) {
        data.response.items = data.response.items.filter(
          (item) => !item.deactivated
        );
        context.commit("ADD_FRIENDS", [
          data.response.items,
          {
            first_name: person.first_name,
            last_name: person.last_name,
            id: person.id,
          },
        ]);
      }

      context.commit("SET_ADD_LOADING", false);
    },
    FETCH_FRIENDS_NUM: async (context, nums) => {
      let data = await Promise.all(
        context.state.friends
          .slice(nums[0], nums[0] + nums[1])
          .map(async (item) => {
            return await api.getNumFriends(item.id);
          })
      );
      context.commit("ADD_FRIENS_NUM", [nums[0], data]);
    },
    GET_POSTS: async (context, id) => {
      let data = await api.getPosts(id);
      data = data.map((post) => {
        post.date = getDate(post.date);
        return post;
      });
      context.commit("ADD_FRIEND_POSTS", data);
    },
  },
  modules: {},
});
