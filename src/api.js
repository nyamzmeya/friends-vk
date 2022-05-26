import { jsonp } from "vue-jsonp";


let TOKEN = "208f0469208f0469208f04697d20f3a7fe2208f208f0469420d51770ede3e5d2ec735ce";

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
    try {
      let data = await jsonp(
        `https://api.vk.com/method/friends.get?user_id=${id}&access_token=${TOKEN}&v=5.131`
      );
      return data.response.count;
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
