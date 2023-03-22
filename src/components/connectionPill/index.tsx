import { useEffect, useState } from 'react';
import { connectSocket } from '../../utils/helper';

function ConnectionPill() {
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    connectSocket().on('connect', () => {
      setConnection(true);
    });

    connectSocket().on('disconnect', () => {
      setConnection(false);
    });
  }, []);
  return (
    <div className={`connection ${connection ? 'connected' : 'disconnected'}`}>
      <span></span>
      <p>{connection ? 'Connected' : 'Disconnected'}</p>
    </div>
  );
}

export default ConnectionPill;
