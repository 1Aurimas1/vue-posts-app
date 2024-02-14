<template>
  <div id="app">
    <NavBar />
    <NotificationList />
    <Modal>
      <component :is="modal.component">Form loading error!</component>
    </Modal>
    <router-view class="mt-5"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import NavBar from "./components/NavBar.vue";
import NotificationList from "./components/Notification/NotificationList.vue";
import { mapGetters } from "vuex";
import Modal from "./components/Modal.vue";

Vue.use(VueRouter);

export default {
  components: {
    NavBar,
    NotificationList,
    Modal,
  },
  computed: {
    ...mapGetters(["modal"]),
  },
};
</script>
