import { VersionInfo } from '@start9labs/start-sdk'

/**
 * v0.5.1 - UI updates and bug fixes
 */
export const v0_5_1_0 = VersionInfo.of({
  version: '0.5.1:0',
  releaseNotes: 'UI updates and bug fixes',
  migrations: {
    up: async ({ effects }) => {
      // No data migration needed
    },
    down: async ({ effects }) => {
      // No data migration needed
    },
  },
})
