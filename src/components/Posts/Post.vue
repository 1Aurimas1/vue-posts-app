<template>
  <div class="columns is-flex has-background-grey-lighter data-list">
    <div class="column is-4 wrap">
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
  },
};
</script>

<style scoped>
.wrap {
  word-wrap: break-word;
  overflow: hidden;
}
.data-list {
  width: 25rem;
}
</style>
