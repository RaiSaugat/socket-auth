import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { GlobalContext } from './context/globalContext';
import Router from './router';

function App() {
  const [room, setRoom] = useState('');
  const [type, setType] = useState(
    JSON.parse(localStorage.getItem('type') || '{}')
  );

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme='light' autoClose={3000} />
      <GlobalContext.Provider value={{ room, type, setRoom, setType }}>
        <div className='bg-purple-50 h-screen'>
          <Router />
        </div>
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
