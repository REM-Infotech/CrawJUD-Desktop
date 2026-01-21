/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
/// <reference types="unplugin-icons/types/vue" />

type Numberish = string | number;
type AuthReturn = Promise<AuthResult>;
type elementRef = Ref<Element | ComponentPublicInstance | HTMLElement | null>;
type PromiseVoid = Promise<unknown>;
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
  fileDialogApi: fileDialogApi;
  themeApi: ThemeApi;
  windowApi: WindowApi;
  matchMedia: typeof window.matchMedia;
  fileService: fileService;
  electron: {
    showFile: (filePath: string) => Promise<void>;
  };
}

interface ToastContent {
  title: string;
  body?: string;
  timeout?: number;
  slots?: Record<string, Component>;
}
