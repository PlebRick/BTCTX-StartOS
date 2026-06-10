import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  adminPassword: z.string().optional().catch(undefined),
})

/**
 * Wrapper-managed secrets, persisted on the `main` volume alongside the
 * database they belong to so that backups and restores keep them in sync.
 */
export const wrapperStore = FileHelper.json(
  { base: sdk.volumes.main, subpath: '/.startos-wrapper.json' },
  shape,
)
