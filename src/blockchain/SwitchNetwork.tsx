import { useNetwork, useSwitchNetwork } from "wagmi";

const SwitchNetwork = () => {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <>
      {chain && <div>Connected to {chain.name}</div>}

      {chains.map((x) => (
        <div key={x.id}>
          <button
            disabled={!switchNetwork || x.id === chain?.id} //checking if already  
            onClick={() => switchNetwork?.(x.id)}
          >
            {x.name}
          </button>
          {isLoading && pendingChainId === x.id && <div> switching</div>}
        </div>
      ))}

      {error && <b>{`Error: ${error.message}`}</b>}
    </>
  );
};

export default SwitchNetwork;
