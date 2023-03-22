import { useState } from 'react';
import { connectSocket } from '../../utils/helper';

let socket = connectSocket();
function JoinRoom({ onJoined }: { onJoined?: any }) {
  const [room, setRoom] = useState<string>('');

  const handleJoinRoom = (e: any) => {
    e.stopPropagation();
    socket.emit('join-room', room, (value: string) => {
      onJoined?.(value);
    });
  };

  return (
    <div className='flex items-center'>
      <h1 className='mr-4 text-md'>Room No</h1>
      <input
        type='text'
        className='border-2 border-gray-300 rounded-md py-2 px-4 mr-4'
        value={room}
        onChange={(e) => {
          e.stopPropagation();
          setRoom(e.target.value);
        }}
      />
      <button
        className='bg-green-500 hover:bg-green-600 py-2 px-4 w-24 flex items-center justify-center rounded-md'
        onClick={handleJoinRoom}
      >
        Join
      </button>
    </div>
  );
}

export default JoinRoom;
