import { jsonp } from "vue-jsonp";

let TOKEN =
  "827d8976d0ce2f9709e1712cd8b649a719367b9d6e4bf7125fa371112ad1c1dbe76d0d03ba2a5033bc7f3";

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
