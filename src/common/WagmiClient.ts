import { createClient, configureChains } from 'wagmi'
import { mainnet, polygon, optimism } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

export const nets = [mainnet, polygon, optimism]

//TODO: alchemy or infura provider
const { chains, provider, webSocketProvider } = configureChains(nets, [publicProvider()])

const client = createClient({
    autoConnect: true,
    connectors: [new MetaMaskConnector({ chains })],
    provider,
    webSocketProvider,
})

export default client
