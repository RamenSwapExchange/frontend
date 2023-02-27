import { useContractRead } from "wagmi";
import { abiERC20 } from "./abi/abiERC20";

const CallFunction = () => {
  const { data, isError, isLoading }:{data: BigInt | undefined, isError: boolean, isLoading: boolean} = useContractRead({
    address: "0x2C76adB0AE170f832011D25797993b45eAdCEbE2",
    abi: abiERC20,
    functionName: "totalSupply",
  });

  return (
    <div>
      Total Supply
      {isLoading ? <div> Loading function  </div> : <div> {data?.toString()} </div>}
    </div>
  );
};

export default CallFunction;
