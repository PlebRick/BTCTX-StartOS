import { T } from '@start9labs/start-sdk'
import { wrapperStore } from '../fileModels/wrapperStore'
import { generateAdminPassword, setAdminCredentials } from '../utils'

/**
 * On fresh install only: seed the database using the app's own
 * initialization logic, then replace the upstream default credentials
 * (admin/password) with a randomly generated password.
 *
 * The password is recorded in the wrapper store before it is written to
 * the database, so it can always be retrieved via the Show Credentials
 * action. Updates and restores never touch existing credentials.
 */
export const firstBoot = async (
  effects: T.Effects,
  kind: 'install' | 'update' | 'restore' | null,
) => {
  if (kind !== 'install') return

  console.info('Fresh install: generating unique admin password')
  const password = generateAdminPassword()
  await wrapperStore.write(effects, { adminPassword: password })
  await setAdminCredentials(effects, password)
}
