import { VersionGraph } from '@start9labs/start-sdk'
import { v0_1_0_0 } from './v0_1_0_0'

/**
 * Here we list every version in sequential order.
 * The current version must be the FIRST argument.
 */
export const versions = VersionGraph.of({
  current: v0_1_0_0,
  other: [],
})
