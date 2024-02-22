import { getNotification } from "../../helpers";

const state = {
  posts: [],
};

const getters = {
  postList: (state) => state.posts,
};

const mutations = {
  setPosts: (state, postList) => {
    state.posts = postList;
  },
};

const actions = {
  async fetchPosts({ commit }) {
    const posts = await this.$api.posts.get({ params: "_expand=author" });
    commit("setPosts", posts);

    const notification = getNotification(
      posts,
      "An error occured while fetching data.",
      "Data fetched successfully!",
      "There are no posts yet"
    );
    commit("addNewNotification", notification);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
