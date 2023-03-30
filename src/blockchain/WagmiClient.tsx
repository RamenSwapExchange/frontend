import { createClient, configureChains } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, celo } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import ethereumIcon from "/images/Ethereum.svg";
import polygonIcon from "/images/Polygon.svg";
import optimismIcon from "/images/Optymism.svg";
import arbitrumIcon from "/images/Arbitrum.svg";
import celoIcon from "/images/Celo.svg";

//TODO: alchemy or infura provider
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, celo],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

export default client;

//#region Chain icons
interface IChainIcons {
  [key: string]: string;
}
const chainIcons: IChainIcons = {};
chainIcons[mainnet.name] = ethereumIcon;
chainIcons[polygon.name] = polygonIcon;
chainIcons[optimism.name] = optimismIcon;
chainIcons[arbitrum.name] = arbitrumIcon;
chainIcons[celo.name] = celoIcon;

export const getChainIcon = (chainName: string) => {
  return chainIcons[chainName];
};
//#endregion

//do wywalenia chyba na razie uzywane tylko w tokens.jsx
export const chainsWithIcons = [
  {
    id: mainnet.id,
    name: mainnet.name,
    icon: ethereumIcon,
  },
  {
    id: polygon.id,
    name: polygon.name,
    icon: polygonIcon,
  },
  {
    id: optimism.id,
    name: optimism.name,
    icon: optimismIcon,
  },
  {
    id: arbitrum.id,
    name: arbitrum.name.substring(0, arbitrum.name.length - 4), //Arbitrum One -> Arbitrum
    icon: arbitrumIcon,
  },
  {
    id: celo.id,
    name: celo.name,
    icon: celoIcon,
  },
];