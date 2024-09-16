import React from 'react';
import WatsonAssistant from '../Components/WatsonAssistant';
import '../assets/global.css';
import '../assets/Footer.css';
import Rodape from '../Components/Rodape';
import SeçãoCentral from '../Components/SeçãoCentral';
import Cabecalho from '../Components/Cabecalho';

const Inicio: React.FC = () => {
  return (
    <>

    <Cabecalho/>
    <SeçãoCentral/>
      <WatsonAssistant />
      <Rodape />
    </>
  );
};

export default Inicio;
