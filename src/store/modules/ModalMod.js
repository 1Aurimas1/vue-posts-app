const state = {
  modal: {
    isVisible: false,
    component: null,
    title: "",
  },
};

const getters = {
  modal: (state) => state.modal,
};

const mutations = {
  showModal: (state, data) => {
    state.modal.isVisible = true;
    state.modal.component = data.componentName;
    state.modal.title = data.title;
  },
  hideModal: (state) => {
    state.modal.isVisible = false;
  },
};

const actions = {
  showModal({ commit }, data) {
    commit("showModal", data);
  },
  hideModal({ commit }) {
    commit("hideModal");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
