import { VersionInfo } from '@start9labs/start-sdk'

/**
 * v0.5.1:1-beta - Beta release with UI updates and bug fixes
 */
export const v0_5_1_1 = VersionInfo.of({
  version: '0.5.1:1-beta',
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
