<template>
  <div class="columns is-flex has-background-grey-lighter data-list">
    <div class="column is-4 wrap">
      {{ author.name }}
    </div>
    <div class="column is-5">
      {{ getNewerDate() }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    author: Object,
  },
  methods: {
    getNewerDate() {
      const createdDate = new Date(this.author.created_at);
      const updatedDate = new Date(this.author.updated_at);
      if (createdDate < updatedDate) return this.author.updated_at;
      return this.author.created_at;
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
