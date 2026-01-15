type MessageType = "success" | "info" | "error" | "warning" | "log";
interface toastOptions {
  title?: string;
  message: string;
  type: MessageType;
  timeout: number;
}
