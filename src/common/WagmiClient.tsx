import { createClient, configureChains } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, celo } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

//TODO: alchemy or infura provider
const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, polygon, optimism, arbitrum, celo],
    [publicProvider()]
)

const client = createClient({
    autoConnect: true,
    connectors: [new MetaMaskConnector({ chains })],
    provider,
    webSocketProvider,
})

export default client
