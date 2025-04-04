import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'bitcointx',
  title: 'BitcoinTX',
  license: 'mit',
  wrapperRepo: 'https://github.com/BitcoinTX-org/BTCTX-StartOS.git',
  upstreamRepo: 'https://github.com/BitcoinTX-org/BTCTX-org.git',
  supportSite: 'https://github.com/BitcoinTX-org/BTCTX-org.git',
  marketingSite: 'https://github.com/BitcoinTX-org/BTCTX-org.git',
  donationUrl: 'https://github.com/BitcoinTX-org/BTCTX-org.git',
  description: {
    short: 'A self-hosted Bitcoin portfolio tracker with double-entry accounting.',
    long: 'BitcoinTX is an open-source, local-first solution that tracks Bitcoin transactions using robust double-entry accounting and FIFO cost-basis.Generate IRS-compliant reports (PDF/CSV). Ideal for single-user setups seeking privacy and auditability.',
  },
  volumes: ['main'],
  images: {
    'bitcointx': {
      source: {
        dockerTag: 'b1ackswan/btctx:latest',
      },
    },
  },
  hardwareRequirements: {},
  alerts: {
    install: 'Optional alert to display before installing the service',
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
