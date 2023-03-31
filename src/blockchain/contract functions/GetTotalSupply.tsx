import { useContractRead } from "wagmi";
import { abiERC20, address } from "../abi/DataERC20";

const GetTotalSupply = () => {
  const {
    data,
    isError,
    isLoading,
  }: { data: BigInt | undefined; isError: boolean; isLoading: boolean } =
    useContractRead({
      address: address,
      abi: abiERC20,
      functionName: "totalSupply",
      watch: true,
      onError(err) {
        console.log(err);
      },
    });

  return (
    <div>
      Total Supply
      {isLoading ? (
        <div> Loading function </div>
      ) : (
        <div> {data?.toString()} </div>
      )}
      {isError && <div> error </div>}
    </div>
  );
};

export default GetTotalSupply;
