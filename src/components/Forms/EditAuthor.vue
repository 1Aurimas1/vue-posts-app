<template>
  <form @submit.prevent="handleUpdate">
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
          Update
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { NotificationTypes } from "../../constants";
import { EditAuthorValidator } from "../../validators";
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
    ...mapGetters(["selectedAuthor", "modal"]),
  },
  methods: {
    ...mapActions(["editAuthor", "addNewNotification", "hideModal"]),
    handleUpdate() {
      const updatedAuthor = JSON.parse(JSON.stringify(this.form));

      const validator = new EditAuthorValidator();
      validator.validateName(this.selectedAuthor.name, updatedAuthor.name);

      if (validator.getErrorCount()) {
        this.addNewNotification({
          message: validator.toStringErrors(),
          type: NotificationTypes.Error,
        });
        return;
      }

      this.performCleanup();

      this.editAuthor({ id: this.selectedAuthor.id, author: updatedAuthor });
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
      if (oldValue) this.setFormValues();
    },
  },
};
</script>
