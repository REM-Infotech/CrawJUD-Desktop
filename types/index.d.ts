type Numberish = string | number;
type AuthReturn = Promise<AuthResult>;
type elementRef = Ref<Element | ComponentPublicInstance | null>;

declare module "~/assets/img/dark/elaw.png" {
  const logoElaw: string;
  export default logoElaw;
}

declare module "~/assets/img/dark/esaj.png" {
  const logoEsaj: string;
  export default logoEsaj;
}

declare module "~/assets/img/dark/esaj.png" {
  const logoEsaj: string;
  export default logoEsaj;
}

declare module "~/assets/img/light/projudi.png" {
  const logoProjudi: string;
  export default logoProjudi;
}

declare module "~/assets/img/dark/pje.png" {
  const logoPJe: string;
  export default logoPJe;
}

declare module "~/assets/img/light/crawjud.png" {
  const logoCrawJUD: string;
  export default logoCrawJUD;
}

declare module "@/assets/img/crawjud2.ico" {
  const CrawJUD2: string;
  export default CrawJUD2;
}

interface cookieApp {
  url: string;
  name?: string;
  value?: string;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  expirationDate?: number;
  sameSite: "unspecified" | "no_restriction" | "lax" | "strict";
}

interface Window {
  jQuery: typeof jQuery;
  $: typeof jQuery;
  matchMedia: typeof window.matchMedia;
  windowApi: WindowApi;
  themeApi: ThemeApi;
  storageApi: StorageApi;
  fileService: fileService;
  cookieService: cookieService;
  safeStorageApi: safeStorageApi;
  electron: {
    showFile: (filePath: string) => Promise<void>;
  };
}

interface AuthPayload {
  message: string;
}

interface AuthResult {
  mensagem: string;
  status: "sucesso" | "erro";
}

interface ComponentsConfiguracaoPage extends Record<string, Component> {
  usuarios: Component;
  credenciais: Component;
}

interface CredencialItem {
  Id: number;
  nome_credencial: string;
  tipo_autenticacao: "cert" | "certificado" | "pw";
  acoesComponent: Component;
}

interface UsuarioItem {
  Id: number;
  nome_Usuario: string;
  login_usuario: string;
  email: string;
  ultimo_login: string;
  acoesComponent: Component;
}

type OpcoesSistema = { value: sistemasRobos | null; text: string; disabled?: boolean };
type OpcoesTipoCredencial = { value?: metodoLogin; text: string; disabled?: boolean };
type metodoLogin = "pw" | "cert" | null;

interface formCredencial {
  nome_credencial?: string | null;

  sistema?: string | null;
  login_metodo?: metodoLogin | null;

  login?: string | null;
  password?: string | null;

  certificado?: CertificadoFile | null;
  cpf_cnpj_certificado?: string | null;
  senha_certificado?: string | null;

  otp?: string | null;
  requer_duplo_fator: boolean;
}
