import { sdk } from '../sdk'
import { resetCredentials } from './resetCredentials'
import { showCredentials } from './showCredentials'

/**
 * Here we list every Action.
 */
export const actions = sdk.Actions.of()
  .addAction(showCredentials)
  .addAction(resetCredentials)
