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
  switch (typeof value) {
    case "string":
      return !value || value.trim().length === 0;
    case "number":
      return value == null;
  }
}

export function isValidLength(value, min, max) {
  return value && min <= value.length && value.length <= max;
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

export function getMaxDate(created_at, updated_at) {
  const createdDate = new Date(created_at);
  const updatedDate = new Date(updated_at);
  if (createdDate < updatedDate) return updated_at;
  return created_at;
}

export function getNotification(
  data,
  errorMessage,
  successMessage,
  successEmptyMessage
) {
  let notification = {};
  if (!data) {
    notification = {
      type: NotificationTypes.Error,
      message: errorMessage || "An unexpected error has occured",
    };
  } else {
    if (isObjectEmpty(data) || data.length === 0) {
      notification = {
        type: NotificationTypes.Success,
        message: successEmptyMessage || "There are no records yet",
      };
    } else {
      notification = {
        type: NotificationTypes.Success,
        message: successMessage || "Operation completed successfully",
      };
    }
  }
  return notification;
}

export function isObjectEmpty(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function getDateNow() {
  return new Date().toISOString().split("T")[0];
}
