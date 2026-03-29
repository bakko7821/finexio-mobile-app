export type NotificationKey = "success" | "warning" | "error" | "info";

export type SetNotificationModal = (
  isVisible: boolean,
  title: string,
  key: NotificationKey,
) => void;
