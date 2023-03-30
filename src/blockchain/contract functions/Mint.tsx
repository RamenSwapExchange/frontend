import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { abiERC20, address } from "../abi/DataERC20";

const Mint = () => {
  const { config } = usePrepareContractWrite({
    address: address,
    abi: abiERC20,
    functionName: "mint",
    args: [1],
    onError(err) {
      console.log(err);
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <button disabled={!write} onClick={() => write?.()}>
        Feed
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default Mint;
