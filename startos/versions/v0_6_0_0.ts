import { VersionInfo } from '@start9labs/start-sdk'

/**
 * v0.6.0:0-beta
 */
export const v0_6_0_0 = VersionInfo.of({
  version: '0.6.0:0-beta',
  releaseNotes:
    'Upstream update to 0.6.0: security dependency updates, 2025 Form 8949 fixes, dark theme improvements',
  migrations: {
    up: async ({ effects }) => {
      // No data migration needed
    },
    down: async ({ effects }) => {
      // No data migration needed
    },
  },
})
