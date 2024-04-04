<template>
  <form @submit.prevent="handleSubmit">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          v-model.trim="form.name"
          @input="validate('name')"
          class="input"
          type="text"
          placeholder="enter author's name..."
          minlength="3"
          maxlength="30"
        />
      </div>
      <p v-if="errors.name" class="help is-danger">{{ errors.name }}</p>
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
import { AuthorRules } from "../../constants";
import { Validator } from "../../validator";
import { mapGetters, mapActions } from "vuex";

const validator = new Validator();

export default {
  data() {
    return {
      form: this.createFormObject(),
      errors: {},
    };
  },
  computed: {
    ...mapGetters(["modal"]),
  },
  methods: {
    ...mapActions(["addNewAuthor", "hideModal"]),
    createFormObject() {
      return { name: "" };
    },
    validate(fieldName) {
      this.errors[fieldName] = validator.validate(
        this.form[fieldName],
        AuthorRules[fieldName]
      );
    },
    handleSubmit() {
      const errors = validator.validateForm(this.form, AuthorRules);
      if (errors) {
        this.errors = errors;
        return;
      }

      const newAuthor = JSON.parse(JSON.stringify(this.form));
      this.addNewAuthor(newAuthor);

      this.performCleanup();
    },
    performCleanup() {
      this.hideModal();
    },
  },
  watch: {
    "modal.isVisible": function (oldValue) {
      if (oldValue) {
        this.errors = {};
        this.form = this.createFormObject();
      }
    },
  },
};
</script>
