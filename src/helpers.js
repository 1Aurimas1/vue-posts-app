import { NotificationTypes } from "./constants";

export function getNotificationStyle(notification) {
  switch (notification.type) {
    case NotificationTypes.Success:
      return "is-success";
    case NotificationTypes.Error:
      return "is-danger";
    default:
      return "is-warning";
  }
}

export function isEmpty(value) {
  return !value || value.trim().length === 0;
}

export function isValidLength(value, min, max) {
  return min <= value.length && value.length <= max;
}

export function containsNumbers(value) {
  const regex = /\d/;
  return regex.test(value);
}

export function containsSpecial(value) {
  const regex = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return regex.test(value);
}

export function isValidFullName(value) {
  const regex = /^(\p{L}[-',.]? ?)+$/u;
  return regex.test(value);
}
