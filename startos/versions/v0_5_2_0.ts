import { VersionInfo } from '@start9labs/start-sdk'

/**
 * v0.5.2:0-beta - UI updates and mobile compatibility
 */
export const v0_5_2_0 = VersionInfo.of({
  version: '0.5.2:0-beta',
  releaseNotes: 'UI updates and mobile compatibility',
  migrations: {
    up: async ({ effects }) => {
      // No data migration needed
    },
    down: async ({ effects }) => {
      // No data migration needed
    },
  },
})
