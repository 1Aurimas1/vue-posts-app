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
  addNewAuthor: (state, author) => {
    state.authors.push(author);
  },
};

const actions = {
  async fetchAuthors({ commit }) {
    const authors = await this.$api.authors.get();
    commit("setAuthors", authors);

    const notification = getNotification(
      authors,
      "An error occured while fetching data.",
      "Data fetched successfully!"
    );
    commit("addNewNotification", notification);
  },

  async addNewAuthor({ commit }, data) {
    const newAuthor = data;
    newAuthor.created_at = new Date().toISOString().split("T")[0];
    newAuthor.updated_at = newAuthor.created_at;

    const response = await this.$api.authors.post(newAuthor);
    if (response) {
      commit("addNewAuthor", response);
    }

    const notification = getNotification(
      response,
      "An error occured while creating author",
      "Author added successfully!"
    );
    commit("addNewNotification", notification);
  },
};

function getNotification(data, errorMessage, successMessage) {
  let notification = {};
  if (!data) {
    notification = {
      type: NotificationTypes.Error,
      message: errorMessage,
    };
  } else {
    if (data.length === 0) {
      notification = {
        type: NotificationTypes.Success,
        message: "There are no authors yet",
      };
    } else {
      notification = {
        type: NotificationTypes.Success,
        message: successMessage,
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
