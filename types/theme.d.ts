// ... Tipos relacionados a tema e notificações

/**
 * Definir temas disponíveis.
 */
type Theme = "dark" | "light" | "system";

/**
 * Direção da notificação.
 */
type NotificationDirection = "auto" | "ltr" | "rtl";

/**
 * Opções de notificação do navegador.
 */
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
