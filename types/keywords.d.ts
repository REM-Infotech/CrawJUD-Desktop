// ... Tipos para argumentos de palavra-chave

/**
 * Argumentos para exibição de mensagens.
 */
interface KeywordArgs {
  title: string;
  message: string;
  type: import("./toast").MessageType;
  duration: number;
}
