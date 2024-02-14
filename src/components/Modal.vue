<template>
  <div class="modal" :class="{ 'is-active': modal.isVisible }">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modal.title }}</p>
        <button @click="hideModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      title: "Modal title",
    };
  },
  computed: {
    ...mapGetters(["modal"]),
  },
  methods: {
    ...mapActions(["hideModal"]),
  },
};
</script>

<style>
.modal-card {
  box-shadow: 5px 5px 30px 10px rgba(0, 0, 0, 0.2);
}
</style>
