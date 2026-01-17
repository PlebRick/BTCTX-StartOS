import { setupManifest } from '@start9labs/start-sdk'

/**
 * Here we define static properties of the package to be displayed in the Marketplace and used by StartOS.
 */
export const manifest = setupManifest({
  id: 'btctx',
  title: 'BitcoinTX',
  version: '0.5.5:0-beta',
  satisfies: [],
  canMigrateTo: '>=0.5.5:0-beta',
  canMigrateFrom: '>=0.1.0:0',
  releaseNotes: 'Upstream update to 0.5.5',
  license: 'mit',
  wrapperRepo: 'https://github.com/PlebRick/BTCTX-StartOS',
  upstreamRepo: 'https://github.com/BitcoinTX-org/BTCTX-org',
  supportSite: 'https://github.com/BitcoinTX-org/BTCTX-org/issues',
  marketingSite: 'https://github.com/BitcoinTX-org/BTCTX-org',
  donationUrl: null,
  docsUrl: 'https://github.com/PlebRick/BTCTX-StartOS#readme',
  description: {
    short: 'Self-hosted Bitcoin portfolio tracker with tax reporting',
    long: 'BitcoinTX is a local-first solution that tracks Bitcoin transactions using robust double-entry accounting and FIFO cost-basis to generate IRS-compliant tax reports including Form 8949 and Schedule D.',
  },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerTag: 'b1ackswan/btctx:latest',
      },
      arch: ['aarch64', 'x86_64'],
    },
  },
  alerts: {
    install:
      'Default login credentials: Username "admin", Password "password". Please change your password after first login.',
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
  hardwareRequirements: {
    arch: ['aarch64', 'x86_64'],
  },
})
