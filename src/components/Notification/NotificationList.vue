<template>
  <ul>
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
