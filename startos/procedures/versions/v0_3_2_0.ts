import { VersionInfo } from '@start9labs/start-sdk'

/**
 * v0.3.2 - Backup restore redirect fix
 */
export const v0_3_2_0 = VersionInfo.of({
  version: '0.3.2:0',
  releaseNotes: 'Fixed backup restore redirect - now properly clears session and redirects to login',
  migrations: {
    up: async ({ effects }) => {
      // No data migration needed - bug fix release only
    },
    down: async ({ effects }) => {
      // No data migration needed - bug fix release only
    },
  },
})
