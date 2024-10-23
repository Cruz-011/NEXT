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
import AgendarServico from './routes/realizaragendamento';
import MecanicoHome from './routes/Mecanico';
import Pendentes from './routes/servicos-pen';
import ServicosConcluidos from './routes/servicos-concl';
 
function App() {
  return (
    <Router>
   
 
      <div className="app-container">
        <Routes>
          <Route path='/Mecanico' element={<MecanicoHome/>} />
          <Route path='/servicos-pen' element={<Pendentes/>} />
          <Route path='/servicos-concl' element={<ServicosConcluidos/>} />
          <Route path='/agendamento' element={<AgendarServico/>} />
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