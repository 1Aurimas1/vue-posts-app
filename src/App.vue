<template>
  <div id="app">
    <NavBar />
    <NotificationList />
    <Modal>
      <component :is="modal.component">Form loading error!</component>
    </Modal>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import NavBar from "./components/NavBar.vue";
import NotificationList from "./components/Notification/NotificationList.vue";
import { mapGetters } from "vuex";
import Modal from "./components/Modal.vue";
import CreateAuthor from "./components/Forms/CreateAuthor.vue";
import EditAuthor from "./components/Forms/EditAuthor.vue";
import DeleteAuthor from "./components/Forms/DeleteAuthor.vue";

Vue.use(VueRouter);

export default {
  components: {
    NavBar,
    NotificationList,
    Modal,
    CreateAuthor,
    EditAuthor,
    DeleteAuthor,
  },
  computed: {
    ...mapGetters(["modal"]),
  },
};
</script>
