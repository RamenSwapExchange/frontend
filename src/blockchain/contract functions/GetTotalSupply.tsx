import { useContractRead } from "wagmi";
import { abiERC20, address } from "../abi/ContractData";

const GetTotalSupply = () => {
  const { data, isError, isLoading }: { data: BigInt | undefined, isError: boolean, isLoading: boolean } = useContractRead({
    address: address,
    abi: abiERC20,
    functionName: "totalSupply",
    watch: true,
  });


  return (
    <div>
      Total Supply
      {isLoading ? <div> Loading function  </div> : <div> {data?.toString()} </div>}
    </div>
  );
};

export default GetTotalSupply;
