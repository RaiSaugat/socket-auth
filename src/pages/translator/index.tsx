import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { Socket } from 'socket.io-client';

import { Button, ConnectionPill, RoomInfo } from '@/components';
import { GlobalContext } from '@/context/globalContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import { exportText } from '@/utils/helper';

function Translator() {
  const { room } = useContext(GlobalContext);
  const { socket }: { socket: Socket } = useOutletContext();

  const [message, setMessage] = useLocalStorage('message', '');
  const [roomName, setRoomName] = useState<string>('');

  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setRoomName(`Room:  ${state.room}`);
    }
  }, [state]);

  const handleExport = () => {
    exportText(message);
  };

  return (
    <div className="flex items-center justify-center flex-col p-4 relative">
      <RoomInfo socket={socket} roomName={roomName} />
      <ConnectionPill socket={socket} />
      <div className="mb-5 mt-5 md:mt-0">
        <h1 className="text-2xl">Live Translation</h1>
      </div>
      <div className="w-[100%] md:w-[80%]">
        <textarea
          placeholder="Message"
          className="border-2 border-solid border-gray-300 rounded-md w-full h-[300px] p-2 mb-5"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.code === 'Space') {
              socket.emit('live-translate', message, room);
            }
          }}
          value={message}>
          {message}
        </textarea>

        <Button type="button" text="Export Speech" onClick={handleExport} />
      </div>
    </div>
  );
}

export default Translator;
