import { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { GlobalContext } from '../../context/globalContext';
import Prompter from '../prompter';
import Translator from '../translator';

function Telecast() {
  const { type } = useContext(GlobalContext);

  if (type === 'Translator') {
    return <Translator />;
  }
  return <Prompter />;
}

export default Telecast;
