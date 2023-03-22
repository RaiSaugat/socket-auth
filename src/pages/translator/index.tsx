import { useState } from 'react';
import { ConnectionPill, JoinRoom } from '../../components';
import useLocalStorage from '../../hooks/useLocalStorage';
import { connectSocket, exportText } from '../../utils/helper';

let socket = connectSocket();

function Translator() {
  const [message, setMessage] = useLocalStorage('message', '');
  const [roomJoined, setRoomJoined] = useState('');

  const handleExport = () => {
    exportText(message);
  };

  // if (!roomJoined) {
  //   return (
  //     <div className='h-screen flex items-center justify-center'>
  //       <JoinRoom onJoined={setRoomJoined} />
  //     </div>
  //   );
  // }

  return (
    <div className='flex items-center justify-center flex-col p-4 relative'>
      <ConnectionPill />
      <div className='mb-5 mt-5 md:mt-0'>
        <h1 className='text-2xl'>Live Translation</h1>
      </div>

      <div className='w-[100%] md:w-[80%] '>
        <textarea
          placeholder='Message'
          className='w-full h-[300px] p-2'
          onChange={(e) => {
            setMessage(e.target.value);
            socket.emit('live-translate', e.target.value, roomJoined);
          }}
          value={message}
        >
          {message}
        </textarea>

        <JoinRoom onJoined={setRoomJoined} />

        <button
          className='w-full bg-green-600 hover:bg-green-700 h-[50px] border-0 rounded-sm cursor-pointer text-white mt-3'
          onClick={handleExport}
        >
          Export Speech
        </button>
      </div>
    </div>
  );
}

export default Translator;
