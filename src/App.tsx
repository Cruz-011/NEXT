import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Servicos from './paginas/servicos';
import HistoricoServicos from './paginas/HistoricoServicos';
import NovoVeiculo from './paginas/NovoVeiculo';
import VeiculosSalvos from './paginas/VeiculoSalvo';
import BarraLateral from './Components/BarraLateral';

function App() {
  return (
    <Router>

      <div className="app-container">
        <BarraLateral />
        
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/historico" element={<HistoricoServicos />} />
          <Route path="/novoveiculo" element={<NovoVeiculo />} />
          <Route path="/veiculossalvos" element={<VeiculosSalvos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
