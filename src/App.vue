<template>
  <div id="app">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import NavBar from "./components/NavBar.vue";

Vue.use(VueRouter);

export default {
  components: {
    NavBar,
  },
};
</script>
