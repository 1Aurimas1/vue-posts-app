<template>
  <div class="columns is-flex has-background-grey-lighter data-list">
    <div @click="showPostDetailPage" class="column is-4 wrap details">
      {{ post.title }}
    </div>
    <div class="column is-2">
      {{ post.author.name }}
    </div>
    <div class="column is-4">
      {{ getNewerDate() }}
    </div>
    <div class="column is-2 is-flex">
      <button
        @click="showEditModal"
        class="button is-small is-warning is-light ml-2"
      >
        E
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { getMaxDate } from "../../helpers";

export default {
  props: {
    post: Object,
  },
  methods: {
    ...mapActions(["showModal"]),
    ...mapMutations(["setSinglePost"]),
    getNewerDate() {
      return getMaxDate(this.post.created_at, this.post.updated_at);
    },
    showPostDetailPage() {
      this.$router.push({ path: `/posts/${this.post.id}` });
    },
    showEditModal() {
      this.setSinglePost(this.post);
      this.showModal({
        componentName: "EditPost",
        title: "Edit post",
      });
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
  width: 35rem;
}
</style>
