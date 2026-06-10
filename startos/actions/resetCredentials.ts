import { sdk } from '../sdk'
import { wrapperStore } from '../fileModels/wrapperStore'
import { generateAdminPassword, setAdminCredentials } from '../utils'

export const resetCredentials = sdk.Action.withoutInput(
  // id
  'reset-credentials',

  // metadata
  async () => ({
    name: 'Reset Login Credentials',
    description:
      'Reset the username to "admin" and generate a new random password. Use this if you are locked out of your account.',
    warning:
      'This will replace your current login credentials. The new password will be displayed once and can be viewed again with the Show Credentials action.',
    allowedStatuses: 'only-stopped',
    group: null,
    visibility: 'enabled',
  }),

  // the execution function
  async ({ effects }) => {
    const password = generateAdminPassword()

    try {
      await wrapperStore.write(effects, { adminPassword: password })
      await setAdminCredentials(effects, password)
    } catch (error) {
      return {
        version: '1',
        title: 'Reset Failed',
        message: `Failed to reset credentials: ${error instanceof Error ? error.message : String(error)}`,
        result: null,
      }
    }

    return {
      version: '1',
      title: 'Credentials Reset',
      message:
        'Your login credentials have been reset. Use the credentials below to log in.',
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: 'Username',
            description: null,
            value: 'admin',
            copyable: true,
            masked: false,
            qr: false,
          },
          {
            type: 'single',
            name: 'Password',
            description: null,
            value: password,
            copyable: true,
            masked: true,
            qr: false,
          },
        ],
      },
    }
  },
)
