import { sdk } from './sdk'
import { T } from '@start9labs/start-sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  console.info('Starting BitcoinTX with minimal alpha config...')

  /**
   * Additional health checks beyond the main one.
   * If not needed, keep empty.
   */
  const additionalChecks: T.HealthCheck[] = []

  /**
   * We create a single daemon named 'primary' that runs the Docker container.
   */
  return sdk.Daemons.of(effects, started, additionalChecks).addDaemon(
    'primary',
    {
      // subcontainer references the image from manifest.ts -> "bitcointx"
      subcontainer: {
        imageId: 'bitcointx',
      },

      // The command the Docker container runs (Python+FastAPI on port 80)
      command: ['uvicorn', 'backend.main:app', '--host', '0.0.0.0', '--port', '80'],

      // Mount the "main" volume at /data so the DB is stored persistently
      mounts: sdk.Mounts.of().addVolume('main', null, '/data', false),

      // Health check to confirm port 80 is listening
      ready: {
        display: 'BitcoinTX Web UI',
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort || 80, {
            successMessage: 'BitcoinTX is running on port 80',
            errorMessage: 'BitcoinTX failed to start on port 80',
          }),
      },
      requires: [],
    },
  )
})
