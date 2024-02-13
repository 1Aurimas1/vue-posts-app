import { NotificationTypes } from "../../constants";

const state = {
  authors: [],
};

const getters = {
  authorList: (state) => state.authors,
};

const mutations = {
  setAuthors: (state, authorList) => {
    state.authors = authorList;
  },
};

const actions = {
  async fetchAuthors({ commit }) {
    const authors = await this.$api.authors.get();
    commit("setAuthors", authors);

    const notification = getNotification(authors);
    commit("addNewNotification", notification);
  },
};

function getNotification(authors) {
  let notification = {};
  if (!authors) {
    notification = {
      type: NotificationTypes.Error,
      message: "An error occured while fetching data.",
    };
  } else {
    if (authors.length === 0) {
      notification = {
        type: NotificationTypes.Success,
        message: "There are no authors yet",
      };
    } else {
      notification = {
        type: NotificationTypes.Success,
        message: "Data fetched successfully!",
      };
    }
  }
  return notification;
}

export default {
  state,
  getters,
  mutations,
  actions,
};
