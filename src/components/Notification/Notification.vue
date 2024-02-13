<template>
  <div class="notification is-warning">
    <button
      class="delete"
      @click="removeNotification(notification.id)"
    ></button>
    {{ truncateMessage() }}
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      messageLimit: 150,
      notificationDuration: 1e4,
    };
  },
  props: {
    notification: Object,
  },
  methods: {
    ...mapActions(["removeNotification"]),
    truncateMessage() {
      const message = this.notification.message;
      if (message && message.length > this.messageLimit) {
        return message.substring(0, this.messageLimit);
      } else {
        return message;
      }
    },
  },
  mounted() {
    this.timeoutId = setTimeout(() => {
      this.removeNotification(this.notification.id);
    }, this.notificationDuration);
  },
  beforeDestroy() {
    clearTimeout(this.timeoutId);
  },
};
</script>
