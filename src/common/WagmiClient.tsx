import { createClient, configureChains } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, celo, polygonMumbai } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

export const nets = [polygonMumbai, mainnet, polygon, optimism, arbitrum, celo]

//TODO: alchemy or infura provider
const { chains, provider, webSocketProvider } = configureChains(
    nets,
    [publicProvider()]
)

const client = createClient({
    autoConnect: true,
    connectors: [new MetaMaskConnector({ chains })],
    provider,
    webSocketProvider,
})

export default client
