import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

/**
 * Initial version for BitcoinTX.
 */
export const v0_1_0_0 = VersionInfo.of({
  version: '0.1.0:0',
  releaseNotes: 'Initial alpha release of BitcoinTX for StartOS',
  migrations: {
    up: async ({ effects }) => {
      // Fresh install - no migration needed
    },
    down: IMPOSSIBLE,
  },
})
