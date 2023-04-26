import { mainnet, polygon, optimism, arbitrum, celo } from 'wagmi/chains'
import ethereumIcon from '/chains/Ethereum.png'
import polygonIcon from '/chains/Polygon.svg'
import optimismIcon from '/chains/Optymism.svg'
import arbitrumIcon from '/chains/Arbitrum.svg'
import celoIcon from '/chains/Celo.svg'

import missingIcon from '/missing_large.png'

interface IChainIcons {
    [key: number]: string
}
const chainIcons: IChainIcons = {}
chainIcons[mainnet.id] = ethereumIcon
chainIcons[polygon.id] = polygonIcon
chainIcons[optimism.id] = optimismIcon
chainIcons[arbitrum.id] = arbitrumIcon
chainIcons[celo.id] = celoIcon

export const getChainIcon = (chainId: number): string => {
    if (chainIcons.hasOwnProperty(chainId)) return chainIcons[chainId]
    else return missingIcon
}
