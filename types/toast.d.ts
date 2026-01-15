// ... Tipos relacionados a toast

/**
 * Tipos de mensagem para toast.
 */
type MessageType = "success" | "info" | "error" | "warning" | "log";

/**
 * Opções para exibição de toast.
 */
interface toastOptions {
  title?: string;
  message: string;
  type: MessageType;
  timeout: number;
}
