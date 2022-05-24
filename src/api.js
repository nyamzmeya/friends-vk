import { jsonp } from "vue-jsonp";

let TOKEN =
  "2df869b6453a45e5dc2bc064c7a15595aa33873c06deb17f4c50d0e57dc3a5474aa9687fbcd9dcfbfe72a";

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
