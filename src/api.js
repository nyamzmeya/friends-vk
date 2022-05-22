import { jsonp } from "vue-jsonp";

let TOKEN =
  "ad5f3a90322cf8016aa37327e3080fb0dcbe7ff1d36901869a37d71cc3dc394fda87565614fb00d7d292b";

let api = {
  async getUserFriends(id) {
    try {
      let data = await jsonp(
        `https://api.vk.com/method/friends.get?user_id=${id}&order=name&fields=photo_200_orig,sex,bdate&access_token=${TOKEN}&v=5.131`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  async getNumFriends(id) {
    console.log(id);
    try {
      let data = await jsonp(
        `https://api.vk.com/method/users.get?user_id=${id}&fields=counters&access_token=${TOKEN}&v=5.131`
      );
      return data.response[0].counters.friends;
    } catch (error) {
      console.log(error);
    }
  },
  async getPosts(id) {
    try {
      let data = await jsonp(
        `https://api.vk.com/method/wall.get?owner_id=${id}&filter=owner&access_token=${TOKEN}&v=5.131`
      );
      return data.response.items;
    } catch (error) {
      console.log(error);
    }
  },
  async getCurrentPerson(id) {
    try {
      let data = await jsonp(
        `https://api.vk.com/method/users.get?user_id=${id}&fields=photo_200_orig&access_token=${TOKEN}&v=5.131`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

export default api;
