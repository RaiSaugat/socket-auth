import { Route, Routes } from 'react-router-dom';
import { Home, Prompter, Translator } from './pages';

const router = (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='translator' element={<Translator />} />
    <Route path='prompter' element={<Prompter />} />
  </Routes>
);

export default router;
