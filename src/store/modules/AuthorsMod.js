import { getDateNow, getNotification } from "../../helpers";

const state = {
  authors: [],
  selectedAuthorId: null,
};

const getters = {
  authorList: (state) => state.authors,
  selectedAuthor: (state) =>
    state.authors.find((a) => a.id === state.selectedAuthorId) || {},
  authorById: (state) => (id) => state.authors.find((a) => a.id === id),
};

const mutations = {
  setAuthors: (state, authorList) => {
    state.authors = authorList;
  },
  addNewAuthor: (state, author) => {
    state.authors.push(author);
  },
  editAuthor: (state, updatedAuthor) => {
    const index = state.authors.findIndex((a) => a.id === updatedAuthor.id);
    if (index !== -1) {
      state.selectedAuthorId = null;
      state.authors.splice(index, 1, updatedAuthor);
    }
  },
  deleteAuthor: (state, id) => {
    const index = state.authors.findIndex((a) => a.id === id);
    if (index !== -1) {
      state.selectedAuthorId = null;
      state.authors.splice(index, 1);
    }
  },
  setSelectedAuthorId: (state, id) => (state.selectedAuthorId = id),
};

const actions = {
  async fetchAuthors({ commit }) {
    const authors = await this.$api.authors.get();
    commit("setAuthors", authors);

    const notification = getNotification(
      authors,
      "An error occured while fetching authors data.",
      "Authors data fetched successfully!",
      "There are no authors yet"
    );
    commit("addNewNotification", notification);
  },

  async addNewAuthor({ commit }, data) {
    const newAuthor = data;
    newAuthor.created_at = getDateNow();
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

  async editAuthor({ commit }, data) {
    const updatedAuthor = data.author;
    updatedAuthor.updated_at = getDateNow();

    const response = await this.$api.authors.patch(data.id, updatedAuthor);
    if (response) {
      commit("editAuthor", response);
    }

    const notification = getNotification(
      response,
      "An error occured while editing author",
      "Author updated successfully!"
    );
    commit("addNewNotification", notification);
  },

  async deleteAuthor({ commit }, id) {
    const response = await this.$api.authors.delete({
      id: id,
      params: "_dependent=posts",
    });
    if (response) {
      commit("deleteAuthor", id);
    }

    const notification = getNotification(
      response,
      "An error occured while deleting author",
      "Author deleted successfully!",
      "Author deleted successfully!"
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
