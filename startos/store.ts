// store.ts
import { setupExposeStore } from '@start9labs/start-sdk'

/**
 * @description 
 * The Store is used for persisting arbitrary data that the *wrapper* package needs,
 * but which is *not* persisted by the underlying service (BitcoinTX) itself.
 *
 * You can keep this file minimal or empty if you have no extra data to store.
 */

export type Store = {
  // Example placeholder:
  // someSetting?: string
}

/**
 * "exposedStore" determines which parts of the Store you want to
 * expose to other services or the UI. If you have no fields,
 * simply return an empty array.
 */
export const exposedStore = setupExposeStore<Store>((pathBuilder) => [
  // If in the future you have store fields you want to expose,
  // place them here, for example:
  // pathBuilder.someSetting,
])
