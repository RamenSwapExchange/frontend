import { mainnet, polygon, optimism, polygonMumbai } from 'wagmi/chains'
import ethereumIcon from '/chains/Ethereum.png'
import polygonIcon from '/chains/Polygon.svg'
import optimismIcon from '/chains/Optymism.svg'
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
    }

    const { netId } = useNet();

    const getIcon = (netId: number): string => {
        if (netIcons.hasOwnProperty(netId)) return netIcons[netId]
        else return errorIcon
    }

    return { icon: getIcon(netId), getIcon }
}

export default useNetIcon