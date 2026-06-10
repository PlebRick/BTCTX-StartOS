import { VersionInfo } from '@start9labs/start-sdk'

/**
 * v0.5.5:0-beta
 */
export const v0_5_5_0 = VersionInfo.of({
  version: '0.5.5:0-beta',
  releaseNotes: 'Upstream update to 0.5.5',
  migrations: {
    up: async ({ effects }) => {
      // No data migration needed
    },
    down: async ({ effects }) => {
      // No data migration needed
    },
  },
})
