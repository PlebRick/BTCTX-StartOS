import { sdk } from '../../sdk'
import { showDefaultCredentials } from './showDefaultCredentials'

/**
 * Here we list every Action.
 */
export const actions = sdk.Actions.of().addAction(showDefaultCredentials)
