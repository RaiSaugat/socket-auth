import { useContext, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { GlobalContext } from '../../context/globalContext';
import useLocalStorage from '../../hooks/useLocalStorage';

function Rooms() {
  const { setRoom, setType } = useContext(GlobalContext);
  const { socket }: { socket: any } = useOutletContext();

  const [localRoomName, setLocalRoomName] = useLocalStorage('room', '');
  const [localType, setLocalType] = useLocalStorage('type', '');
  const [token, setToken] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleJoinRoom = (e: any) => {
    e.preventDefault();
    socket.connect();
    socket.emit(
      'join-room',
      { room: localRoomName, type: localType, masterToken: token },
      (data: { success: boolean; message: string }) => {
        if (!data.success) {
          setErrorMessage(data.message);
        } else {
          navigate('/telecast', {
            state: {
              room: data.message,
            },
          });
        }
      }
    );
  };

  return (
    <div className='flex flex-col h-full items-center justify-center'>
      <form className='bg-violet-100 border-2 border-violet-300 border-solid rounded-md p-5'>
        <div className='mb-4'>
          <span className='block'>Room</span>
          <input
            type='text'
            value={localRoomName}
            onChange={(e) => {
              setLocalRoomName(e.target.value);
              setRoom(e.target.value);
            }}
            className='w-full h-10 p-2 border-2 border-gray-300 rounded-md mr-4'
          />
        </div>

        <div className='mb-4'>
          <span className='block mb-2'>Type</span>
          <div className='flex items-center'>
            <select
              name='roles'
              id='roles'
              className='w-full p-1 rounded-md h-10 cursor-pointer'
              onChange={(e) => {
                setLocalType(e.target.value);
                setType(e.target.value);
              }}
            >
              <option value=''>Select Type</option>
              <option value='Translator'>Translator</option>
              <option value='Prompter'>Prompter</option>
            </select>
          </div>
        </div>

        <div>
          <span className='block mb-1'>Token</span>
          <input
            type='text'
            value={token}
            onChange={(e) => {
              setErrorMessage('');
              setToken(e.target.value);
            }}
            className='w-full h-10 p-2 border-2 border-gray-300 rounded-md mr-4'
          />
        </div>

        <button
          className='mt-4 px-2 py-4 bg-violet-600 hover:bg-violet-800 text-white h-4 w-full rounded-md flex items-center justify-center font-bold cursor-pointer mr-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={(e) => {
            if (localRoomName && localType) {
              handleJoinRoom(e);
            }
          }}
          disabled={!localRoomName || !localType}
        >
          Join
        </button>
      </form>
      {errorMessage && <div className='text-red-400 mt-2'>{errorMessage}</div>}
    </div>
  );
}

export default Rooms;
