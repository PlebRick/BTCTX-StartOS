import { sdk } from './sdk'
import { exposedStore } from './store'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { yamlFile } from './file-models/config.yml'

// **** Install ****
const install = sdk.setupInstall(async ({ effects }) => {
  // If you have any logic to run on initial install,
  // such as writing default config files or setting up the store, do it here.

  // Example (commented out if unused):
  // await yamlFile.write(effects, { someField: "someValue" })
  // await sdk.store.setOwn(effects, sdk.StorePath.secretPhrase, getSecretPhrase("BitcoinTX"))
})

// **** Uninstall ****
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  install,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  exposedStore,
)
