import {
  isEmpty,
  isValidFullName,
  isValidMinLength,
  isValidMaxLength,
  containsNumbers,
} from "./helpers";

export class Validator {
  constructor() {}

  validate(value, ruleString) {
    const rulesToCheck = ruleString.split("|");
    for (const rule of rulesToCheck) {
      const [ruleName, ruleValue] = rule.split(":");
      const ruleArgs = ruleValue ? ruleValue.split(",") : ruleValue;

      const errorMessage = this[ruleName](value, ruleArgs);
      if (errorMessage) return errorMessage;
    }
    return "";
  }

  validateForm(form, rules) {
    const errors = {};
    for (const entry of Object.entries(form)) {
      const [fieldName, fieldValue] = entry;
      const errorMessage = this.validate(fieldValue, rules[fieldName]);
      if (errorMessage) {
        errors[fieldName] = errorMessage;
      }
    }
    return Object.keys(errors).length === 0 ? null : errors;
  }

  required(value) {
    return !isEmpty(value) ? "" : "is required";
  }

  min(value, [length]) {
    return isValidMinLength(value, length)
      ? ""
      : `length must be at least ${length} characters`;
  }

  max(value, [length]) {
    return isValidMaxLength(value, length)
      ? ""
      : `length must not exceed ${length} characters`;
  }

  between(value, [min, max]) {
    return isValidMinLength(value, min) && isValidMaxLength(value, max)
      ? ""
      : `length must be between ${min} and ${max} characters inclusive`;
  }

  fullname(value) {
    return isValidFullName(value) ? "" : "name is not valid";
  }

  non_numeric(value) {
    return !containsNumbers(value) ? "" : "must not contain numbers";
  }

  is_not_same(value, [otherValue]) {
    return value !== otherValue ? "" : "must not be the same";
  }
}
