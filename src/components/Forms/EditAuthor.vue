<template>
  <form @submit.prevent="handleUpdate">
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
          Update
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
      form: {
        name: "",
      },
      errors: {},
    };
  },
  computed: {
    ...mapGetters(["selectedAuthor", "modal"]),
    rules() {
      return {
        ...AuthorRules,
        name: `${AuthorRules.name}|is_not_same:${this.selectedAuthor.name}`,
      };
    },
  },
  methods: {
    ...mapActions(["editAuthor", "hideModal"]),
    validate(fieldName) {
      this.errors[fieldName] = validator.validate(
        this.form[fieldName],
        this.rules[fieldName]
      );
    },
    handleUpdate() {
      const errors = validator.validateForm(this.form, this.rules);
      if (errors) {
        this.errors = errors;
        return;
      }

      const updatedAuthor = JSON.parse(JSON.stringify(this.form));
      this.editAuthor({ id: this.selectedAuthor.id, author: updatedAuthor });

      this.performCleanup();
    },
    performCleanup() {
      this.hideModal();
    },
    setFormValues() {
      this.form.name = this.selectedAuthor.name;
    },
  },
  watch: {
    selectedAuthor: {
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
