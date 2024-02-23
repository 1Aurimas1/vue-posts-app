import {
  isEmpty,
  isValidLength,
  containsNumbers,
  isValidFullName,
} from "./helpers";

export class BaseValidator {
  #errors;

  constructor() {
    this.#errors = [];
  }

  get errors() {
    return this.#errors;
  }

  addError(error) {
    this.#errors.push(error);
  }

  getErrorCount() {
    return this.#errors.length;
  }

  toStringErrors() {
    return this.#errors.join(". ");
  }
}

export class CreateAuthorValidator extends BaseValidator {
  constructor() {
    super();
  }

  validateName(name) {
    const minLength = 3;
    const maxLength = 30;

    if (isEmpty(name)) {
      super.addError("Name is required");
    }

    if (!isValidLength(name, minLength, maxLength)) {
      super.addError(
        `Name length must be between ${minLength} and ${maxLength} characters inclusive`
      );
    }

    if (containsNumbers(name)) {
      super.addError("Name contains numbers");
    }

    if (!isValidFullName(name)) {
      super.addError("Name is not valid");
    }
  }
}

export class EditAuthorValidator extends CreateAuthorValidator {
  constructor() {
    super();
  }

  validateName(oldName, newName) {
    super.validateName(newName);

    if (oldName === newName) {
      super.addError("Name should not be the same");
    }
  }
}

export class CreatePostValidator {
  constructor() {}

  validateTitle(title) {
    const minLength = 5;
    const maxLength = 20;

    if (isEmpty(title)) {
      return "Title is required";
    }

    if (!isValidLength(title, minLength, maxLength)) {
      return `Title length must be between ${minLength} and ${maxLength} characters inclusive`;
    }

    return "";
  }

  validateAuthorId(id) {
    if (isEmpty(id)) {
      return "Author is required";
    }

    return "";
  }

  validateBody(body) {
    const minLength = 15;
    const maxLength = 300;

    if (isEmpty(body)) {
      return "Content is required";
    }

    if (!isValidLength(body, minLength, maxLength)) {
      return `Content length must be between ${minLength} and ${maxLength} characters inclusive`;
    }

    return "";
  }

  validateAll(post) {
    const errors = {
      title: this.validateTitle(post.title),
      authorId: this.validateAuthorId(post.authorId),
      body: this.validateBody(post.body),
    };
    return errors;
  }
}
