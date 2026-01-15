// ... Tipos para variáveis de ambiente

/**
 * Variáveis de ambiente do projeto.
 */
interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_BETA_TEST: string;
  VITE_MINIO_ENDPOINT: string;
  VITE_MINIO_PORT: string;
  VITE_MINIO_ACCESS_KEY: string;
  VITE_MINIO_SECRET_KEY: string;
  VITE_MINIO_BUCKET_NAME: string;
}

/**
 * Interface para import.meta.
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
