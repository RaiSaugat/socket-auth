import { useNavigate } from 'react-router-dom';
import Rooms from '../rooms';

function Home() {
  return (
    <div className='flex h-full items-center justify-center'>
      <Rooms />
    </div>
  );
}

export default Home;
