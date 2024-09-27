import React from 'react';
import Cabecalho from '../Components/Cabecalho'; 
import styles from '../assets/historicoservicos.module.css';
import BarraLateral from '../Components/BarraLateral';

interface Servico {
  descricao: string;
  status: 'Concluído' | 'Cancelado' | 'Em andamento';
  veiculo: string;
  data: string;
}

const historicoServicos: Servico[] = [
  {
    descricao: 'Troca de óleo',
    status: 'Concluído',
    veiculo: 'Honda Civic 2020',
    data: '15/09/2024',
  },
  {
    descricao: 'Revisão de freios',
    status: 'Em andamento',
    veiculo: 'Toyota Corolla 2019',
    data: '16/09/2024',
  },
];

const HistoricoServicos: React.FC = () => {
  return (
    <div>
      <Cabecalho />
      <BarraLateral />

      <div className={styles.historicoServicos}>
        <h1>Histórico de Serviços</h1>
        <table>
          <thead>
            <tr>
              <th>Serviço Realizado</th>
              <th>Status do Pedido</th>
              <th>Veículo</th>
              <th>Data do Serviço</th>
            </tr>
          </thead>
          <tbody>
            {historicoServicos.map((servico, index) => (
              <tr key={index}>
                <td>{servico.descricao}</td>
                <td>{servico.status}</td>
                <td>{servico.veiculo}</td>
                <td>{servico.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricoServicos;
