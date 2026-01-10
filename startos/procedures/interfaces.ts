import { sdk } from '../sdk'

export const uiPort = 80
export const webUiInterfaceId = 'webui'

/**
 * ======================== Service Interfaces ========================
 *
 * Here we decide how the service will be exposed to the outside world.
 *
 * This function runs on install, update, and config save.
 */
export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, 'ui-multi')
  const uiMultiOrigin = await uiMulti.bindPort(uiPort, { protocol: 'http' })
  const ui = sdk.createInterface(effects, {
    name: 'Web UI',
    id: webUiInterfaceId,
    description: 'The web interface of BitcoinTX',
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  const uiReceipt = await uiMultiOrigin.export([ui])

  return [uiReceipt]
})
