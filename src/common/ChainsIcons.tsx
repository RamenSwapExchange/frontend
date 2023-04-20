import { mainnet, polygon, optimism, arbitrum, celo } from 'wagmi/chains'
import ethereumIcon from '/images/Ethereum.png'
import polygonIcon from '/images/Polygon.svg'
import optimismIcon from '/images/Optymism.svg'
import arbitrumIcon from '/images/Arbitrum.svg'
import celoIcon from '/images/Celo.svg'
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
    else return missingIcon //TODO
}

//do wywalenia chyba na razie uzywane tylko w tokens.jsx
export const chainsIcons = [
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
]
