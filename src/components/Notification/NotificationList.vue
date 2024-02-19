<template>
  <ul class="overlay">
    <li v-for="notification in notificationList" :key="notification.id">
      <Notification :notification="notification" />
    </li>
  </ul>
</template>

<script>
import Notification from "./Notification.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Notification,
  },
  computed: mapGetters(["notificationList"]),
};
</script>

<style scoped>
.overlay {
  position: absolute;
  width: 100%;
  z-index: 2;
}
</style>
