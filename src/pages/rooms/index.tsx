import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/globalContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import { connectSocket } from '../../utils/helper';

function Rooms() {
  const { setRoom, setType } = useContext(GlobalContext);

  const [localRoomName, setLocalRoomName] = useLocalStorage('room', '');
  const [localType, setLocalType] = useLocalStorage('type', '');
  const [token, setToken] = useState<string>('');

  const navigate = useNavigate();

  const handleJoinRoom = (e: any) => {
    e.preventDefault();

    connectSocket().emit(
      'join-room',
      { room: localRoomName, type: localType },
      (data: string) => {
        navigate('/telecast', {
          state: {
            room: data,
          },
        });
      }
    );
  };

  return (
    <div>
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
    </div>
  );
}

export default Rooms;
