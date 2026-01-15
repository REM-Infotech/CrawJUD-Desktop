type Theme = "dark" | "light" | "system";
type NotificationDirection = "auto" | "ltr" | "rtl";
interface NotificationOptions {
  badge?: string;
  body?: string;
  data?: unknown;
  dir?: NotificationDirection;
  icon?: string;
  lang?: string;
  requireInteraction?: boolean;
  silent?: boolean | null;
  tag?: string;
}
