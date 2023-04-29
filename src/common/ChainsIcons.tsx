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
const chainIcons: IChainIcons = {}
chainIcons[polygonMumbai.id] = polygonIcon
chainIcons[mainnet.id] = ethereumIcon
chainIcons[polygon.id] = polygonIcon
chainIcons[optimism.id] = optimismIcon
chainIcons[arbitrum.id] = arbitrumIcon
chainIcons[celo.id] = celoIcon

export const getChainIcon = (chainId: number): string => {
    if (chainIcons.hasOwnProperty(chainId)) return chainIcons[chainId]
    else return errorIcon
}

// chains when not connected to MetaMask
export const localChains = [
    {
        id: polygonMumbai.id,
        name: polygonMumbai.name,
    },
    {
        id: mainnet.id,
        name: mainnet.name,
    },
    {
        id: polygon.id,
        name: polygon.name,
    },
    {
        id: optimism.id,
        name: optimism.name,
    },
    {
        id: arbitrum.id,
        name: arbitrum.name.substring(0, arbitrum.name.length - 4), //Arbitrum One -> Arbitrum
    },
    {
        id: celo.id,
        name: celo.name,
    },
]