import { createClient, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
 
//TODO: alchemy or infura provider
const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
  webSocketProvider,
});

export default client;
