import { VersionInfo } from '@start9labs/start-sdk'

/**
 * v0.3.1 - Bug fixes for Docker compatibility
 */
export const v0_3_1_0 = VersionInfo.of({
  version: '0.3.1:0',
  releaseNotes: 'Fixed backup/restore for Docker compatibility, improved temp file handling',
  migrations: {
    up: async ({ effects }) => {
      // No data migration needed - bug fix release only
    },
    down: async ({ effects }) => {
      // No data migration needed - bug fix release only
    },
  },
})
