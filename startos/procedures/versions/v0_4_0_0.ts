import { VersionInfo } from '@start9labs/start-sdk'

/**
 * v0.4.0 - CSV import/export and UI improvements
 */
export const v0_4_0_0 = VersionInfo.of({
  version: '0.4.0:0',
  releaseNotes: 'CSV import support, CSV export option alongside encrypted backups, UI improvements',
  migrations: {
    up: async ({ effects }) => {
      // No data migration needed - feature release
    },
    down: async ({ effects }) => {
      // No data migration needed - feature release
    },
  },
})
