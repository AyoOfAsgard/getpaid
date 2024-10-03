import { useConnect, useDisconnect, useAccount } from 'wagmi';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
import { useCallback } from 'react'; // {{ edit_1 }}

const buttonStyles = {
  background: 'transparent',
  border: '1px solid transparent',
  boxSizing: 'border-box' as const,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 200,
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold' as const,
  fontSize: 18,
  backgroundColor: '#0052FF',
  paddingLeft: 15,
  paddingRight: 30,
  borderRadius: 10,
  cursor: 'pointer',
  color: 'white',
};

export function BlueCreateWalletButton() {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  const handleClick = useCallback(() => {
    if (isConnected) {
      disconnect();
    } else {
      const coinbaseWalletConnector = connectors.find(
        (connector) => connector.id === 'coinbaseWalletSDK'
      );
      if (coinbaseWalletConnector) {
        connect({ connector: coinbaseWalletConnector });
      }
    }
  }, [connectors, connect, disconnect, isConnected]);

  return (
    <button style={buttonStyles} onClick={handleClick}>
      <CoinbaseWalletLogo />
      {isConnected ? 'Disconnect' : 'Create Wallet'}
    </button>
  );
}