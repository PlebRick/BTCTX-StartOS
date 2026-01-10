import { sdk } from '../sdk'

/**
 * Here we define which volumes to back up.
 *
 * BitcoinTX stores its SQLite database in the "main" volume at /data.
 */
export const { createBackup, restoreInit } = sdk.setupBackups(
  async ({ effects }) => sdk.Backups.ofVolumes('main'),
)
