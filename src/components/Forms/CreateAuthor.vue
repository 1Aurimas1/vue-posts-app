<template>
  <form @submit.prevent="handleSubmit">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          v-model.lazy.trim="form.name"
          class="input"
          type="text"
          placeholder="enter author's name..."
          minlength="3"
          maxlength="30"
        />
      </div>
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
import { NotificationTypes } from "../../constants";
import { CreateAuthorValidator } from "../../validators";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
  computed: {
    ...mapGetters(["modal"]),
  },
  methods: {
    ...mapActions(["addNewAuthor", "addNewNotification", "hideModal"]),
    handleSubmit() {
      const newAuthor = JSON.parse(JSON.stringify(this.form));

      const validator = new CreateAuthorValidator();
      validator.validateName(newAuthor.name);

      if (validator.getErrorCount()) {
        this.addNewNotification({
          message: validator.toStringErrors(),
          type: NotificationTypes.Error,
        });
        return;
      }

      this.performCleanup();

      this.addNewAuthor(newAuthor);
    },
    performCleanup() {
      this.hideModal();
    },
  },
  watch: {
    "modal.isVisible": function (oldValue) {
      if (oldValue) this.form = {};
    },
  },
};
</script>
