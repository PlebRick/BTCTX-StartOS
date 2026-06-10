import { T, utils } from '@start9labs/start-sdk'
import { sdk } from './sdk'

/**
 * Here we define any constants or functions that are shared by multiple components throughout the package codebase.
 */

/** The standard mount of the `main` volume at /data, shared by the daemon and credential scripts. */
export function mainMounts() {
  return sdk.Mounts.of().mountVolume({
    volumeId: 'main',
    subpath: null,
    mountpoint: '/data',
    readonly: false,
  })
}

export function generateAdminPassword(): string {
  return utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 22 })
}

/** The action result group displaying login credentials. */
export function credentialsResult(password: string) {
  return {
    type: 'group' as const,
    value: [
      {
        type: 'single' as const,
        name: 'Username',
        description: null,
        value: 'admin',
        copyable: true,
        masked: false,
        qr: false,
      },
      {
        type: 'single' as const,
        name: 'Password',
        description: null,
        value: password,
        copyable: true,
        masked: true,
        qr: false,
      },
    ],
  }
}

/**
 * Ensures the database exists (using the app's own initialization logic),
 * then sets the admin user's username and password. The password is passed
 * as an argument, not interpolated into the script.
 */
const setCredentialsScript = `
import os, sys
sys.path.insert(0, '/app')
os.environ['DATABASE_FILE'] = '/data/btctx.db'
from backend.database import create_tables
create_tables()
import bcrypt, sqlite3
password_hash = bcrypt.hashpw(sys.argv[1].encode(), bcrypt.gensalt()).decode()
conn = sqlite3.connect('/data/btctx.db')
cursor = conn.cursor()
cursor.execute(
    "UPDATE users SET username = 'admin', password_hash = ? WHERE id = (SELECT MIN(id) FROM users)",
    (password_hash,),
)
conn.commit()
conn.close()
print('Credentials updated')
`

export async function setAdminCredentials(
  effects: T.Effects,
  password: string,
): Promise<void> {
  await sdk.SubContainer.withTemp(
    effects,
    { imageId: 'main' },
    mainMounts(),
    'set-credentials',
    async (subc) => {
      await subc.execFail(['python', '-c', setCredentialsScript, password])
    },
  )
}
