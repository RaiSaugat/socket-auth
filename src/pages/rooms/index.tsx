import React, { useContext, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Socket } from 'socket.io-client';

import { GlobalContext } from '@/context/globalContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import { toast } from 'react-toastify';
import { Button, Input } from '@/components';

function Rooms() {
  const { setRoom, setType } = useContext(GlobalContext);
  const { socket }: { socket: Socket } = useOutletContext();

  const [localRoomName, setLocalRoomName] = useLocalStorage('room', '');
  const [localType, setLocalType] = useLocalStorage('type', '');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleJoinRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    e.preventDefault();
    socket.connect();
    socket.emit(
      'join-room',
      { room: localRoomName, type: localType, masterToken: token },
      (data: { success: boolean; message: string }) => {
        setIsLoading(false);
        if (!data.success) {
          toast.error(data.message);
        } else {
          navigate('/telecast', {
            state: {
              room: data.message
            }
          });
        }
      }
    );
  };

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <form className="bg-violet-100 border-2 border-violet-300 border-solid rounded-md p-5">
        <div className="mb-4">
          <span className="block">Room</span>
          <Input
            type="text"
            value={localRoomName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLocalRoomName(e.target.value);
              setRoom(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <span className="block mb-2">Type</span>
          <div className="flex items-center">
            <select
              name="roles"
              id="roles"
              className="w-full p-1 rounded-md h-10 cursor-pointer"
              onChange={(e) => {
                setLocalType(e.target.value);
                setType(e.target.value);
              }}>
              <option value="">Select Type</option>
              <option value="Translator">Translator</option>
              <option value="Prompter">Prompter</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <span className="block mb-1">Token</span>
          <Input
            type="text"
            value={token}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setToken(e.target.value);
            }}
          />
        </div>

        <Button
          text="Join"
          onClick={(e) => {
            if (localRoomName && localType) {
              handleJoinRoom(e);
            }
          }}
          disabled={!localRoomName || !localType}
          type="button"
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}

export default Rooms;
