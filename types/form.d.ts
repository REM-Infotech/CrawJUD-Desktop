// ... Tipos de formulários

/**
 * Estrutura do formulário de login.
 */
interface FormLogin {
  login: string;
  password: string;
  remember: boolean;
}

interface formBot {
  configuracao_form: ConfigForm | null;
  xlsx: File | null;
  anexos: File[] | null;

  cpf_cnpj_certificado: string | null;
  credencial: number | null | undefined;
  senha_token: string | null;

  certificado: CertificadoFile;
  senha_certificado: string | null;

  kdbx: KbdxFile;
  senha_kdbx: string | null;

  sid_filesocket: string | null;
  bot_id: number | null;
}
