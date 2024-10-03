import { useCallback } from 'react';
import { useConnect, useDisconnect, useAccount } from 'wagmi';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';

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

const addressStyles = {
  marginTop: '10px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  wordBreak: 'break-all' as const,
};

export function BlueCreateWalletButton() {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

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
    <div>
      <button style={buttonStyles} onClick={handleClick}>
        <CoinbaseWalletLogo />
        {isConnected ? 'Disconnect' : 'Create Wallet'}
      </button>
      {isConnected && address && (
        <div style={addressStyles}>
          Wallet Address: {address}
        </div>
      )}
    </div>
  );
}