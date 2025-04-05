import { sdk } from './sdk'
import { T } from '@start9labs/start-sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('Starting BitcoinTX')

  /**
   * ======================== Additional Health Checks (optional) ========================
   *
   * In this section, we define *additional* health checks beyond those included with each daemon (below).
   */
  const additionalChecks: T.HealthCheck[] = []

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects, started, additionalChecks).addDaemon(
    'primary',
    {
      subcontainer: { imageId: 'bitcointx' },
      command: ['uvicorn', 'backend.main:app', '--host', '0.0.0.0', '--port', '80'],
      mounts: sdk.Mounts.of().addVolume('main', null, '/data', false),
      ready: {
        display: 'BitcoinTX Interface',
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: 'BitcoinTX is ready',
            errorMessage: 'BitcoinTX failed to start on port 80.',
          }),
      },
      requires: [],
    },
  )
})
