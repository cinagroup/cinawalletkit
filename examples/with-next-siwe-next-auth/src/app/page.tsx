import { ConnectButton } from '@cinagroup/cinawalletkit';

export default function Page() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />
    </div>
  );
}
