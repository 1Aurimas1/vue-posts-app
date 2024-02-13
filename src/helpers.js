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
