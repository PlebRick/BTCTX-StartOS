import { VersionInfo } from '@start9labs/start-sdk'

/**
 * v0.7.0:0
 */
export const v0_7_0_0 = VersionInfo.of({
  version: '0.7.0:0',
  releaseNotes:
    'Upstream v0.7.0 — River CSV Import: import your River bitcoin-activity CSV directly into a live ledger with safe, idempotent merge-and-dedup, an editable preview before anything is written, fair-market-value cost-basis autofill for BTC interest/income deposits, and atomic all-or-nothing imports. Covers all River row patterns: buys, sells, BTC interest, tagged withdrawals, and untagged on-chain sends/receives.',
  migrations: {
    up: async ({ effects }) => {
      // No data migration needed
    },
    down: async ({ effects }) => {
      // No data migration needed
    },
  },
})
