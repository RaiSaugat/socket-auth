import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className='flex h-full items-center justify-center'>
      <button
        onClick={() => navigate('/prompter')}
        className='px-4 py-6 bg-green-600 hover:bg-green-800 text-white h-16 w-52 rounded-md flex items-center justify-center font-bold cursor-pointer mr-4'
      >
        Prompter
      </button>
      <button
        onClick={() => navigate('/translator')}
        className='px-4 py-6 bg-green-600 hover:bg-green-800 text-white h-16 w-52 rounded-md flex items-center justify-center font-bold cursor-pointer'
      >
        Translator
      </button>
    </div>
  );
}

export default Home;
