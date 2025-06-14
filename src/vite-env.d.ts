/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLOUDINARY_CLOUD_NAME: string
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string
  readonly VITE_UNSPLASH_ACCESS_KEY: string
  // add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
