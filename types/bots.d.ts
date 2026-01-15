/**
 * Representa os sistemas judiciais suportados.
 */

type FileInput = File[] | File | undefined;
type sistemasRobos = "PROJUDI" | "ESAJ" | "ELAW" | "JUSDS" | "PJE" | "CAIXA" | "TJDFT" | "CSI";
type Contadores = "total" | "sucessos" | "erros" | "restantes";
type CertificadoFile = (File & { name: `${string}.pfx` }) | null;
type KbdxFile = (File & { name: `${string}.kdbx` }) | null;
type StatusBot = "Inicializando" | "Em Execução" | "Finalizado";
type ConfigForm = "file_auth" | "multiple_files" | "only_auth" | "only_file" | "proc_parte";

type Execucao = {
  Id: number;
  bot: string;
  id_execucao: string;
  status: StatusBot;
  data_inicio: string;
  data_fim: string;
};

type Execucoes = Execucao[];

interface CrawJudBot {
  Id: number;
  configuracao_form: ConfigForm;
  display_name: string;
  sistema: sistemasRobos;
  descricao: string;
  categoria: string;
}

interface BotPayload {
  listagem: CrawJudBot[];
}
interface CredenciaisSelect {
  value: number | null | undefined;
  text: string;
}
interface CredenciaisPayload {
  credenciais: CredenciaisSelect[];
}
interface StartBotPayload {
  id_execucao: string;
  title: string;
  message: string;
  status: MessageType;
}

interface Message {
  id_execucao: string;
  message: string;
  time_message: string;
  message_type: MessageType;
  status: StatusBot;
  start_time: string;
  row: number;
  total: number;
  erros: number;
  sucessos: number;
  restantes: number;
  link: string;
}

interface ValoresContador extends Record<Contadores, number> {
  [key in T]: number;
}
