import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './routes/Inicio';
import Servicos from './routes/servicos';
import HistoricoServicos from './routes/HistoricoServicos';
import NovoVeiculo from './routes/NovoVeiculo';
import VeiculosSalvos from './routes/VeiculoSalvo';
import LoginCadastro from './routes/Login';

function App() {
  return (
    <Router>

      <div className="app-container"> 
        <Routes>
          <Route path="/login" element={<LoginCadastro />} />
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
