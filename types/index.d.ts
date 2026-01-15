/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
/// <reference types="unplugin-icons/types/vue" />

type Numberish = string | number;
type AuthReturn = Promise<AuthResult>;
type elementRef = Ref<Element | ComponentPublicInstance | null>;

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
  $: typeof jQuery;
  jQuery: typeof jQuery;

  themeApi: ThemeApi;
  windowApi: WindowApi;
  storageApi: StorageApi;
  fileService: fileService;
  cookieService: cookieService;
  safeStorageApi: safeStorageApi;
  matchMedia: typeof window.matchMedia;
}
