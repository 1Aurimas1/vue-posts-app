<template>
  <div class="is-flex is-flex-direction-column is-align-items-center">
    <h1 class="title">{{ title }}</h1>
    <div>
      <router-link to="/posts" class="button is-info is-light is-normal mb-5">
        {{ "<-- View posts" }}
      </router-link>
      <div v-if="post && post.author" class="card">
        <header class="card-header">
          <div class="card-header-title">
            <p>{{ post.title }}</p>
            <p class="author ml-2">{{ post.author.name }}</p>
          </div>
          <p class="date card-header-icon">{{ getNewerDate() }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            {{ post.body }}
          </div>
        </div>
        <footer class="card-footer">
          <button
            @click="showEditModal"
            class="card-footer-item button is-link is-inverted"
          >
            Edit
          </button>
          <button
            @click="showDeleteModal"
            class="card-footer-item button is-danger is-inverted"
          >
            Delete
          </button>
        </footer>
      </div>
      <h2 v-else-if="post" class="subtitle notification is-warning">
        The article does not exist
      </h2>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getMaxDate } from "../helpers";

export default {
  data() {
    return {
      title: "Post detail page",
      isDeleted: false,
    };
  },
  computed: {
    ...mapGetters({ post: "singlePost" }),
    ...mapGetters(["postList"]),
  },
  methods: {
    ...mapActions(["fetchSinglePost", "showModal"]),
    getNewerDate() {
      return getMaxDate(this.post.created_at, this.post.updated_at);
    },
    showEditModal() {
      this.showModal({
        componentName: "EditPost",
        title: "Edit post",
      });
    },
    showDeleteModal() {
      this.showModal({
        componentName: "DeletePost",
        title: "Delete post",
      });
    },
  },
  watch: {
    postList: {
      immediate: true,
      handler() {
        if (!this.isDeleted) {
          const postId = this.$route.params.id;
          this.fetchSinglePost(postId);
        }
      },
    },
    post(newVal, oldVal) {
      if (oldVal && !newVal) {
        this.isDeleted = true;
        this.$router.push({ path: "/posts" });
      }
    },
  },
};
</script>

<style scoped>
.author {
  font-weight: normal;
}
.date {
  cursor: pointer;
  pointer-events: none;
}
</style>
