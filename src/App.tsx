import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { GlobalContext } from './context/globalContext';
import router from './router';

function App() {
  const [room, setRoom] = useState('');
  const [type, setType] = useState(
    JSON.parse(localStorage.getItem('type') || '{}')
  );

  return (
    <GlobalContext.Provider value={{ room, type, setRoom, setType }}>
      <div className='bg-purple-50 h-screen'>
        <BrowserRouter> {router}</BrowserRouter>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
