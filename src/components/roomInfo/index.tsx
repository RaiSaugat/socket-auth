import { useNavigate } from 'react-router-dom';

function RoomInfo({ roomName, socket }: { roomName: string; socket: any }) {
  const navigate = useNavigate();
  const handleLeaveRoom = () => {
    socket.emit('leave-room', roomName, () => {
      socket.disconnect();
      localStorage.removeItem('room');
      localStorage.removeItem('type');
      localStorage.removeItem('message');
      navigate('/rooms');
      window.location.reload();
    });
  };
  return (
    <div className='text-lg italic font-bold self-start'>
      {roomName}
      <button
        className='ml-2 bg-red-400 text-white px-2 py-1 rounded-md text-sm'
        onClick={handleLeaveRoom}
      >
        Leave Room
      </button>
    </div>
  );
}

export default RoomInfo;
