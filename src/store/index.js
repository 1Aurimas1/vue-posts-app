import Vue from "vue";
import Vuex from "vuex";
import NotificationsMod from "./modules/NotificationsMod";
import AuthorsMod from "./modules/AuthorsMod";
import ModalMod from "./modules/ModalMod";
import apiPlugin from "./plugins/apiPlugin";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    NotificationsMod,
    AuthorsMod,
    ModalMod,
  },
  plugins: [apiPlugin],
});
