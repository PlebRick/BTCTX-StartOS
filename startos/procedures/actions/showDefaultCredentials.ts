import { sdk } from '../../sdk'

export const showDefaultCredentials = sdk.Action.withoutInput(
  // id
  'show-default-credentials',

  // metadata
  async () => ({
    name: 'Show Default Credentials',
    description:
      'Display the default username and password for logging into BitcoinTX.',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // the execution function
  async () => {
    return {
      version: '1',
      title: 'Default Login Credentials',
      message:
        'Use these credentials to log in to BitcoinTX for the first time. You should change your password after logging in.',
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
            value: 'password',
            copyable: true,
            masked: true,
            qr: false,
          },
        ],
      },
    }
  },
)
