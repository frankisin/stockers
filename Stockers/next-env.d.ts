/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_AI_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}