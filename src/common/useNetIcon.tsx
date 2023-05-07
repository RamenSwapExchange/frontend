import { mainnet, polygon, optimism, arbitrum, celo, polygonMumbai } from 'wagmi/chains'
import ethereumIcon from '/chains/Ethereum.png'
import polygonIcon from '/chains/Polygon.svg'
import optimismIcon from '/chains/Optymism.svg'
import arbitrumIcon from '/chains/Arbitrum.svg'
import celoIcon from '/chains/Celo.svg'
import useNet from './useNet'
import errorIcon from '/error.png'

type netIconsConfig = {
    [key: number]: string
}

const useNetIcon = () => {
    const netIcons: netIconsConfig = {
        [polygonMumbai.id]: polygonIcon,
        [mainnet.id]: ethereumIcon,
        [polygon.id]: polygonIcon,
        [optimism.id]: optimismIcon,
        [arbitrum.id]: arbitrumIcon,
        [celo.id]: celoIcon
    }

    const { netId } = useNet();

    const getNetIcon = (netId: number): string => {
        if (netIcons.hasOwnProperty(netId)) return netIcons[netId]
        else return errorIcon
    }

    return { icon: getNetIcon(netId), getIcon: getNetIcon }
}

export default useNetIcon