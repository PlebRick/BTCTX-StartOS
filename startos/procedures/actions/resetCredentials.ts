import { sdk } from '../../sdk'

export const resetCredentials = sdk.Action.withoutInput(
  // id
  'reset-credentials',

  // metadata
  async () => ({
    name: 'Reset Login Credentials',
    description:
      'Reset the username and password back to the defaults (admin/password). Use this if you are locked out of your account.',
    warning:
      'This will reset your login credentials to the default values. Anyone with access to your server will be able to log in until you change the password.',
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // the execution function
  async ({ effects }) => {
    const mounts = sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: '/data',
      readonly: false,
    })

    try {
      await sdk.SubContainer.withTemp(
        effects,
        { imageId: 'main' },
        mounts,
        'reset-creds',
        async (subc) => {
          await subc.execFail([
            'python',
            '-c',
            `
import bcrypt
import sqlite3

default_hash = bcrypt.hashpw(b"password", bcrypt.gensalt()).decode("utf-8")

conn = sqlite3.connect("/data/btctx.db")
cursor = conn.cursor()
cursor.execute("UPDATE users SET username = 'admin', password_hash = ? WHERE id = 1", (default_hash,))
conn.commit()
conn.close()
print("Credentials reset successfully")
`,
          ])
        },
      )
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
        'Your login credentials have been reset to the defaults. Please log in and change your password immediately.',
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
