import { useEffect, useState } from 'react';

function ConnectionPill({ socket }: { socket: any }) {
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    setConnection(socket.connected);
  }, [socket.connected]);

  return (
    <div className={`connection ${connection ? 'connected' : 'disconnected'}`}>
      <span></span>
      <p>{connection ? 'Connected' : 'Disconnected'}</p>
    </div>
  );
}

export default ConnectionPill;
