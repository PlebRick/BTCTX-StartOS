import { sdk } from '../sdk'
import { setDependencies } from './dependencies/dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { restoreInit } from './backups'
import { actions } from './actions'

/**
 * Plumbing. DO NOT EDIT.
 *
 * This sets up what happens when the service initializes and uninitializes.
 */
export const init = sdk.setupInit(restoreInit, versions, setDependencies, setInterfaces, actions)

export const uninit = sdk.setupUninit(versions)
