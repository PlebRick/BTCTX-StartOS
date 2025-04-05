import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'bitcointx',
  title: 'BitcoinTX',
  license: 'mit',
  wrapperRepo: 'https://github.com/BitcoinTX-org/BTCTX-StartOS.git',
  upstreamRepo: 'https://github.com/BitcoinTX-org/BTCTX-org.git',
  supportSite: 'https://docs.start9.com/',
  marketingSite: 'https://start9.com/',
  donationUrl: 'https://donate.start9.com/',
  description: {
    short: 'A self-hosted Bitcoin portfolio tracker with double-entry accounting.',
    long: 'BitcoinTX is a local-first solution that tracks Bitcoin transactions using robust double-entry accounting and FIFO cost-basis to generate IRS-compliant reports.',
  },
  volumes: ['main'], // One persistent volume named "main"
  images: {
    // Ties to "subcontainer: { imageId: 'bitcointx' }" in main.ts
    'bitcointx': {
      source: {
        dockerTag: 'b1ackswan/btctx:latest',
      },
    },
  },
  hardwareRequirements: {},
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
