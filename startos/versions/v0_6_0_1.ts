import { VersionInfo } from '@start9labs/start-sdk'

/**
 * v0.6.0:1-beta
 */
export const v0_6_0_1 = VersionInfo.of({
  version: '0.6.0:1-beta',
  releaseNotes:
    'Wrapper improvements: a unique admin password is now generated on fresh installs (run the Show Credentials action to retrieve it; existing installs keep their current credentials), the health check now verifies the web UI responds over HTTP, the upstream image is pinned to its version tag for reproducible builds, and credential reset now rotates to a fresh random password.',
  migrations: {
    up: async ({ effects }) => {
      // No data migration needed: password generation runs on fresh
      // installs only; existing credentials are untouched
    },
    down: async ({ effects }) => {
      // No data migration needed
    },
  },
})
