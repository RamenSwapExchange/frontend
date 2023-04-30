import { mainnet, polygon, optimism, arbitrum, celo, polygonMumbai } from 'wagmi/chains'
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changeOfflineNetId, selectOfflineNetId } from "../redux/appSlice";

const offlineNets = [polygonMumbai, mainnet, polygon, optimism, arbitrum, celo]

type useCurrentNetConfig = {
    /** Function to invoke when error occurs in changing net in wallet */
    onErrorChangeNet?(): void
}

const useCurrentNet = ({ onErrorChangeNet }: useCurrentNetConfig = {}) => {
    const { isConnected } = useAccount();
    const { chain } = useNetwork();
    const dispatch = useAppDispatch()
    const offlineNetId = useAppSelector(selectOfflineNetId)

    const changeOfflineNet = (netId: number) => {
        dispatch(changeOfflineNetId(netId))
    }

    const changeNet = useSwitchNetwork({
        onError() {
            onErrorChangeNet!()
        }
    })

    const netId = isConnected ? chain?.id! : offlineNetId;
    const net = isConnected ? chain : offlineNets.find(net => netId == net.id)
    const unsupported = chain?.unsupported;

    return { net, netId: netId, netUnsupported: unsupported, changeNet, offlineNets, changeOfflineNet };
}

export default useCurrentNet