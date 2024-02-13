const state = {
  notifications: [],
};

const getters = {
  notificationList: (state) => state.notifications,
};

const mutations = {
  addNewNotification: (state, notification) => {
    notification.id = generateUID();
    state.notifications.unshift(notification);
  },
  removeNotification: (state, idToRemove) => {
    const index = state.notifications.findIndex((n) => n.id === idToRemove);
    if (index !== -1) {
      state.notifications.splice(index, 1);
    }
  },
};

const actions = {
  addNewNotification({ commit }, notification) {
    commit("addNewNotification", notification);
  },
  removeNotification({ commit }, id) {
    commit("removeNotification", id);
  },
};

function generateUID() {
  const radix = 36;
  return (
    Date.now().toString(radix) + Math.random().toString(radix).substring(2)
  );
}

export default {
  state,
  getters,
  actions,
  mutations,
};
