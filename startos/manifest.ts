import { setupManifest } from '@start9labs/start-sdk'

/**
 * Here we define static properties of the package to be displayed in the Marketplace and used by StartOS.
 */
export const manifest = setupManifest({
  id: 'btctx',
  title: 'BitcoinTX',
  version: '0.3.0:0',
  satisfies: [],
  canMigrateTo: '>=0.3.0:0',
  canMigrateFrom: '>=0.1.0:0',
  releaseNotes: 'Added 2025 IRS Form 8949 and Schedule D support with fixed field mapping',
  license: 'mit',
  wrapperRepo: 'https://github.com/BitcoinTX-org/BTCTX-StartOS',
  upstreamRepo: 'https://github.com/BitcoinTX-org/BTCTX',
  supportSite: 'https://github.com/BitcoinTX-org/BTCTX/issues',
  marketingSite: 'https://github.com/BitcoinTX-org/BTCTX',
  donationUrl: null,
  docsUrl: 'https://github.com/BitcoinTX-org/BTCTX#readme',
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
      arch: ['aarch64'],
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
    arch: ['aarch64'],
  },
})
