import { sdk } from '../sdk'
import { config } from './config'
import { nameToLogs } from './nameToLogs'

export const actions = sdk.Actions.of().addAction(config).addAction(nameToLogs)
