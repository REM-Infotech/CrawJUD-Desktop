interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_BETA_TEST: string;
  readonly VITE_MINIO_PORT: string;
  readonly VITE_MINIO_ENDPOINT: string;
  readonly VITE_MINIO_ACCESS_KEY: string;
  readonly VITE_MINIO_SECRET_KEY: string;
  readonly VITE_MINIO_BUCKET_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
