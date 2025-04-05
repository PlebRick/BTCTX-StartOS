import { sdk } from './sdk'
import { exposedStore } from './store'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { yamlFile } from './file-models/config.yml'

/**
 * A minimal, no-op install function
 */
const install = sdk.setupInstall(async ({ effects }) => {
  // Do nothing. No secrets or config.
})

/**
 * A minimal, no-op uninstall function
 */
const uninstall = sdk.setupUninstall(async ({ effects }) => {
  // Do nothing
})

/**
 * Standard boilerplate from the hello-world example
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  install,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  exposedStore,
  // If you previously had a store, remove or pass "undefined" or an
)
