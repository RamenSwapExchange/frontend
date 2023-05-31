import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAsyncTokenDetails, removeSelectedToken, selectProductDetail } from "../../redux/tokensSlice";
import "./tokenDetails.scss"

const TokenDetails = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(selectProductDetail);
    console.log(data)
    //https://api.portals.fi/v2/tokens?addresses=polygon:0xf5164054dc7a1997ecc42b996b8bf12a2046048c
    const { id } = useParams();
    console.log(id)

    useEffect(() => {
        dispatch(fetchAsyncTokenDetails(id!));
        return () => {
            dispatch(removeSelectedToken());
        };
    }, [dispatch, id]);

    return (
        <div>TokenDetails</div>
    )
}

export default TokenDetails