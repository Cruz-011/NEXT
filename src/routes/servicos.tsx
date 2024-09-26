import React from 'react';
import Cabecalho from '../Components/Cabecalho'; 
import { Link } from 'react-router-dom';
import BarraLateral from '../Components/BarraLateral';
import styles from '../assets/ServicosEmAndamento.module.css';

interface ServicoAndamento {
  veiculo: string;
  oficina: string;
  dia: string;
  problema: string;
  pecas: string[];
  previsaoConclusao: string;
  telefoneContato: string;
  pdfOrcamento: string; 
}

const servicosEmAndamento: ServicoAndamento[] = [
  {
    veiculo: 'Toyota Corolla 2019',
    oficina: 'Oficina ABC',
    dia: '16/09/2024',
    problema: 'Revisão de freios',
    pecas: ['Disco de freio - R$ 300', 'Pastilhas de freio - R$ 150'],
    previsaoConclusao: '20/09/2024',
    telefoneContato: '(11) 99999-9999',
    pdfOrcamento: './public/ordem de serviço.pdf', 
  },
];

const ServicosEmAndamento: React.FC = () => {
  return (
    <div>
      <Cabecalho />
      <BarraLateral />

      <div className={styles.servicosEmAndamento}>
        <h1>Serviços em Andamento</h1>
        {servicosEmAndamento.map((servico, index) => (
          <div key={index} className={styles.servicoItem}>
            <h2>Veículo: {servico.veiculo}</h2>
            <p><strong>Oficina:</strong> {servico.oficina}</p>
            <p><strong>Data:</strong> {servico.dia}</p>
            <p><strong>Problema:</strong> {servico.problema}</p>
            <p><strong>Peças:</strong></p>
            <ul>
              {servico.pecas.map((peca, idx) => (
                <li key={idx}>{peca}</li>
              ))}
            </ul>
            <p><strong>Previsão de Conclusão:</strong> {servico.previsaoConclusao}</p>
            <p><strong>Telefone de Contato:</strong> {servico.telefoneContato}</p>
            <p>
              <strong>Orçamento:</strong> 
              <a href={servico.pdfOrcamento} target="_blank" rel="noopener noreferrer">Ver PDF</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicosEmAndamento;
