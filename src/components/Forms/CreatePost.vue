<template>
  <form @submit.prevent="handleSubmit">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input
          v-model.trim="form.title"
          @input="validateTitle"
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
      <label class="label">Author</label>
      <div class="control">
        <div class="select">
          <select
            v-model.lazy="form.authorId"
            @change="validateAuthorId"
            required
          >
            <option disabled value="">Please select one</option>
            <option
              v-for="author in authorList"
              :key="author.id"
              :value="author.id"
            >
              {{ author.name }}
            </option>
          </select>
        </div>
      </div>
      <p v-if="errors.authorId" class="help is-danger">
        {{ errors.authorId }}
      </p>
    </div>
    <div class="field">
      <label class="label">Content</label>
      <div class="control">
        <textarea
          v-model.trim="form.body"
          @input="validateBody"
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
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { CreatePostValidator } from "../../validators";
import { mapGetters, mapActions } from "vuex";

const validator = new CreatePostValidator();

export default {
  data() {
    return {
      form: {
        title: "",
        authorId: "",
        body: "",
      },
      errors: {},
    };
  },
  computed: {
    ...mapGetters(["modal", "authorList"]),
  },
  methods: {
    ...mapActions(["addNewPost", "hideModal", "fetchAuthors"]),
    validateTitle() {
      this.errors.title = validator.validateTitle(this.form.title);
    },
    validateAuthorId() {
      this.errors.authorId = validator.validateAuthorId(this.form.authorId);
    },
    validateBody() {
      this.errors.body = validator.validateBody(this.form.body);
    },
    handleSubmit() {
      this.errors = validator.validateAll(this.form);
      for (const err of Object.values(this.errors)) if (err) return;

      const newPost = JSON.parse(JSON.stringify(this.form));
      this.addNewPost(newPost);

      this.performCleanup();
    },
    performCleanup() {
      this.hideModal();
    },
  },
  created() {
    this.fetchAuthors();
  },
  watch: {
    "modal.isVisible": function (oldValue) {
      if (oldValue) {
        this.errors = {};
        this.form = {
          authorId: "",
        };
      }
    },
  },
};
</script>
