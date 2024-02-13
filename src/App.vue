<template>
  <div id="app">
    <NavBar />
    <NotificationList />
    <router-view class="mt-5"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import NavBar from "./components/NavBar.vue";
import NotificationList from "./components/Notification/NotificationList.vue";

Vue.use(VueRouter);

export default {
  components: {
    NavBar,
    NotificationList,
  },
};
</script>
