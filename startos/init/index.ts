import { sdk } from '../sdk'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versions } from '../versions'
import { restoreInit } from '../backups'
import { actions } from '../actions'
import { firstBoot } from './firstBoot'

/**
 * This sets up what happens when the service initializes and uninitializes.
 * Scripts run in the order they are listed.
 */
export const init = sdk.setupInit(
  restoreInit,
  versions,
  firstBoot,
  setDependencies,
  setInterfaces,
  actions,
)

export const uninit = sdk.setupUninit(versions)
