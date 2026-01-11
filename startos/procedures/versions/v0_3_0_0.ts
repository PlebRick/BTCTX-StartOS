import { VersionInfo } from '@start9labs/start-sdk'

/**
 * v0.3.0 - Added 2025 IRS form support
 */
export const v0_3_0_0 = VersionInfo.of({
  version: '0.3.0:0',
  releaseNotes: 'Added 2025 IRS Form 8949 and Schedule D support with fixed field mapping',
  migrations: {
    up: async ({ effects }) => {
      // No data migration needed - internal feature update only
    },
    down: async ({ effects }) => {
      // No data migration needed - internal feature update only
    },
  },
})
