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
    if (data.length === 0) {
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
