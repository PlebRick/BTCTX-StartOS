// actions/index.ts
import { sdk } from '../sdk'

/**
 * The StartOS "Actions" feature allows you to define
 * user-facing buttons in the UI that run custom code,
 * optionally presenting forms or returning structured data.
 *
 * Since we have no current actions, we create an empty set here.
 * Add new actions later by chaining .addAction(...)
 */
export const actions = sdk.Actions.of()
