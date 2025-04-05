import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
// import { someMigrationAction } from '../actions/someAction' // if you need an action

export const v_0_1_0_0 = VersionInfo.of({
  version: '0.1.0:0', // Keep the colon notation: "0.1.0:0"
  releaseNotes: 'Initial alpha release of BitcoinTX for StartOS',
  migrations: {
    up: async ({ effects }) => {
      // If you need to run some migration code when upgrading
      // from a previous version to 0.1.0:0, put it here:
      //   await sdk.action.requestOwn(effects, someMigrationAction, 'critical')
    },
    // If rolling back to a previous version is impossible, keep "IMPOSSIBLE".
    down: IMPOSSIBLE,
  },
})
