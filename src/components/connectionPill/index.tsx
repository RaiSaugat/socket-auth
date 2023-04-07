import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

function ConnectionPill({ socket }: { socket: Socket }) {
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (socket) setConnection(socket.connected);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [socket]);

  return (
    <div className={`connection ${connection ? 'connected' : 'disconnected'}`}>
      <span></span>
      <p>{connection ? 'Connected' : 'Disconnected'}</p>
    </div>
  );
}

export default ConnectionPill;
