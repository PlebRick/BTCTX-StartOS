import { sdk } from '../sdk'
import { wrapperStore } from '../fileModels/wrapperStore'
import { credentialsResult } from '../utils'

export const showCredentials = sdk.Action.withoutInput(
  // id
  'show-credentials',

  // metadata
  async () => ({
    name: 'Show Credentials',
    description:
      'Display the username and password for logging into BitcoinTX.',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // the execution function
  async ({ effects }) => {
    const stored = await wrapperStore.read().once()
    const password = stored?.adminPassword

    return {
      version: '1',
      title: 'Login Credentials',
      message: password
        ? 'Use these credentials to log in to BitcoinTX.'
        : 'This install predates generated credentials, so the upstream defaults are shown. If you have changed your password in the app, use that instead. You should change the default password after logging in.',
      result: credentialsResult(password ?? 'password'),
    }
  },
)
