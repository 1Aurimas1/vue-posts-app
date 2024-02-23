import { getNotification } from "../../helpers";

const state = {
  posts: [],
  singlePost: {},
};

const getters = {
  postList: (state) => state.posts,
  singlePost: (state) => state.singlePost,
};

const mutations = {
  setPosts: (state, postList) => {
    state.posts = postList;
  },
  setSinglePost: (state, post) => {
    state.singlePost = post;
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

  async fetchSinglePost({ commit }, id) {
    const post = await this.$api.posts.get({
      id: id,
      params: "_expand=author",
    });
    commit("setSinglePost", post);

    const notification = getNotification(
      post,
      "An error occured while fetching article.",
      "Post fetched successfully!",
      "The article does not exist."
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
