import { mainnet, polygon, optimism, arbitrum, celo, polygonMumbai } from 'wagmi/chains'
import ethereumIcon from '/chains/Ethereum.png'
import polygonIcon from '/chains/Polygon.svg'
import optimismIcon from '/chains/Optymism.svg'
import arbitrumIcon from '/chains/Arbitrum.svg'
import celoIcon from '/chains/Celo.svg'

import errorIcon from '/error.png'

interface IChainIcons {
    [key: number]: string
}
const chainIcons: IChainIcons = {
    [polygonMumbai.id]: polygonIcon,
    [mainnet.id]: ethereumIcon,
    [polygon.id]: polygonIcon,
    [optimism.id]: optimismIcon,
    [arbitrum.id]: arbitrumIcon,
    [celo.id]: celoIcon
}

export const getChainIcon = (chainId: number): string => {
    if (chainIcons.hasOwnProperty(chainId)) return chainIcons[chainId]
    else return errorIcon
}

export const getLocalChain = (chainId: number) => {
    return localChains.find(chain => {
        return chain.id === chainId
    });
}

// chains when not connected to MetaMask
export const localChains = [polygonMumbai, mainnet, polygon, optimism, arbitrum, celo]