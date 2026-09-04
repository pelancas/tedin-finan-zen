/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base da API do orienta-dd (túnel Cloudflare), sem barra no final. */
  readonly VITE_ORIENTA_API_URL: string;
  /** Token fixo exigido pela API do orienta-dd (header X-API-Token). */
  readonly VITE_ORIENTA_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
