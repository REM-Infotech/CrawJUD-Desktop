type FormComponentRecord = Record<ConfigForm, Component | undefined>;
type RecordFileAuthForm = { PlanilhaXlsx: FileInStorage[] | undefined; Credencial: string | null };
type RecordOnlyFileForm = { PlanilhaXlsx: FileInStorage };
type RecordOnlyAuthForm = { Credencial: string | null };
type RecordMultipleFilesForm = {
  PlanilhaXlsx: File | undefined;
  Anexos: File[] | undefined;
  Credencial: string | null;
};

type RecordPJeProtocoloForm = {
  PlanilhaXlsx: File | undefined;
  Anexos: File[] | undefined;
  certificado: File | undefined;
  SenhaCertificado: string | null;
};

type RecordPJeFileAuthForm = {
  PlanilhaXlsx: File | undefined;
  certificado: File | undefined;
  SenhaCertificado: string | null;
};

interface formManager {
  FormBot: FormData;
  bot: Ref<CrawJudBot>;
  fileSocket: Socket;
  LoadCredential(selectedCredential: string | undefined): void;
  uploadXlsx(xlsxFile: File | undefined): Promise<void>;
  uploadMultipleFiles(xlsxFile: File[] | undefined): Promise<void>;
}
