import { VersionGraph } from '@start9labs/start-sdk'
import { v0_1_0_0 } from './v0_1_0_0'
import { v0_3_0_0 } from './v0_3_0_0'
import { v0_3_1_0 } from './v0_3_1_0'
import { v0_3_2_0 } from './v0_3_2_0'

/**
 * Here we list every version in sequential order.
 * The current version must be the FIRST argument.
 */
export const versions = VersionGraph.of({
  current: v0_3_2_0,
  other: [v0_3_1_0, v0_3_0_0, v0_1_0_0],
})
