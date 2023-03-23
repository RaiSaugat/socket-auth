import { useContext } from 'react';
import { GlobalContext } from '../../context/globalContext';
import Prompter from '../prompter';
import Translator from '../translator';

function Telecast({ socket }: { socket: any }) {
  const { type } = useContext(GlobalContext);

  if (type === 'Translator') {
    return <Translator socket={socket} />;
  }
  return <Prompter socket={socket} />;
}

export default Telecast;
