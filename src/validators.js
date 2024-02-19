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
