<template>
  <form @submit.prevent="handleUpdate">
    <p v-if="errors.general" class="subtitle is-6 general-error">
      {{ errors.general }}
    </p>
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input
          v-model.trim="form.title"
          @input="validate('title')"
          class="input"
          type="text"
          placeholder="enter post's title..."
          minlength="5"
          maxlength="20"
        />
      </div>
      <p v-if="errors.title" class="help is-danger">{{ errors.title }}</p>
    </div>
    <div class="field">
      <label class="label">Content</label>
      <div class="control">
        <textarea
          v-model.trim="form.body"
          @input="validate('body')"
          class="textarea"
          type="text"
          placeholder="enter post's content..."
          minlength="15"
          maxlength="300"
        ></textarea>
      </div>
      <p v-if="errors.body" class="help is-danger">{{ errors.body }}</p>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-primary is-outlined">
          Update
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { PostRules } from "../../constants";
import { Validator } from "../../validator";
import { mapGetters, mapActions } from "vuex";

const validator = new Validator();

export default {
  data() {
    return {
      form: {
        title: "",
        body: "",
      },
      errors: {},
    };
  },
  computed: {
    ...mapGetters(["singlePost", "modal"]),
  },
  methods: {
    ...mapActions(["hideModal"]),
    ...mapActions(["editPost", "hideModal"]),
    validate(fieldName) {
      this.errors[fieldName] = validator.validate(
        this.form[fieldName],
        PostRules[fieldName]
      );
    },
    handleUpdate() {
      const errors = validator.validateForm(this.form, PostRules);
      if (errors) {
        this.errors = errors;
        return;
      }

      const updatedPost = JSON.parse(JSON.stringify(this.form));
      this.editPost({ id: this.singlePost.id, post: updatedPost });

      this.performCleanup();
    },
    performCleanup() {
      this.hideModal();
    },
    setFormValues() {
      this.form.title = this.singlePost.title;
      this.form.body = this.singlePost.body;
    },
  },
  watch: {
    singlePost: {
      immediate: true,
      handler() {
        this.setFormValues();
      },
    },
    "modal.isVisible": function (oldValue) {
      if (oldValue) {
        this.errors = {};
        this.setFormValues();
      }
    },
  },
};
</script>

<style>
.general-error {
  color: red;
}
</style>
