import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changeOfflineNetId, selectOfflineNetId } from "../redux/appSlice";
import { nets } from './WagmiClient';

type useCurrentNetConfig = {
    /** Function to invoke when error occurs in changing net in wallet */
    onErrorChangeNet?(): void
}

const useNet = ({ onErrorChangeNet }: useCurrentNetConfig = {}) => {
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
    const net = isConnected ? chain : nets.find(net => netId == net.id)
    const unsupported = chain?.unsupported;

    return { net, nets, netId, unsupported, changeNet, changeOfflineNet };
}

export default useNet