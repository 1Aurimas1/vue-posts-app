<template>
  <div class="columns is-flex has-background-grey-lighter data-list">
    <div @click="showPostDetailPage" class="column is-4 wrap details">
      {{ post.title }}
    </div>
    <div class="column is-3">
      {{ post.author.name }}
    </div>
    <div class="column is-5">
      {{ getNewerDate() }}
    </div>
  </div>
</template>

<script>
import { getMaxDate } from "../../helpers";

export default {
  props: {
    post: Object,
  },
  methods: {
    getNewerDate() {
      return getMaxDate(this.post.created_at, this.post.updated_at);
    },
    showPostDetailPage() {
      this.$router.push({ path: `/posts/${this.post.id}` });
    },
  },
};
</script>

<style scoped>
.wrap {
  word-wrap: break-word;
  overflow: hidden;
}
.details:hover {
  background-color: hsl(219, 70%, 96%);
  cursor: pointer;
}
.data-list {
  width: 25rem;
}
</style>
