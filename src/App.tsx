import { BrowserRouter, RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return (
    <div className='bg-purple-50 h-screen'>
      <BrowserRouter> {router}</BrowserRouter>
    </div>
  );
}

export default App;
