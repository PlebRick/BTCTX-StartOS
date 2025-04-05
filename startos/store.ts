import { setupExposeStore } from '@start9labs/start-sdk'

/**
 * The Store is a simple object. We'll store "secretKey" for persistence.
 */
export type Store = {
  secretKey?: string
}

export const exposedStore = setupExposeStore<Store>((pathBuilder) => [
  // If you wanted to expose something to the UI, you can list it here.
  // For now, we won't expose "secretKey".
])
