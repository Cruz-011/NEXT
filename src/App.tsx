import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './routes/Inicio';
import Servicos from './routes/servicos';
import HistoricoServicos from './routes/HistoricoServicos';
import NovoVeiculo from './routes/NovoVeiculo';
import VeiculosSalvos from './routes/VeiculoSalvo';
import LoginCadastro from './routes/Login';
import Rodape from './Components/Rodape';
import Mecanico from './routes/Mecanico';
import AgendamentosRealizados from './routes/AgendamentosRealizados';
import RealizarAgendamento from './routes/realizaragendamento';
 
function App() {
  return (
    <Router>
   
 
      <div className="app-container">
        <Routes>
          <Route path='/realizaragendamento' element={<RealizarAgendamento/>} />
          <Route path="/AgendamentosRealizados" element={<AgendamentosRealizados />} />
          <Route path="/Mecanico" element={<Mecanico />} />
          <Route path="/login" element={<LoginCadastro />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/historico" element={<HistoricoServicos />} />
          <Route path="/novoveiculo" element={<NovoVeiculo />} />
          <Route path="/veiculossalvos" element={<VeiculosSalvos />} />
        </Routes>
      </div>
      <Rodape/>
    </Router>
   
  );
}
 
export default App;