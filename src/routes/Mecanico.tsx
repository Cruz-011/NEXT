import React, { useState } from 'react';
import CabecalhoMec from '../Components/CabecalhoMec';
import styles from '../assets/Mecanico.module.css';

const MecanicoHome: React.FC = () => {
  const [numeroPedido, setNumeroPedido] = useState('');
  const [servicosPendentes, setServicosPendentes] = useState<{ id: string, nome: string }[]>([
    { id: '1', nome: 'Troca de Óleo' },
    { id: '2', nome: 'Troca de Pneu' },
    { id: '3', nome: 'Alinhamento' },
  ]);

  const handleAceitar = (pedidoId: string) => {
    // Lógica para aceitar o serviço
    alert(`Serviço ${pedidoId} aceito.`);
    setServicosPendentes(prev => prev.filter(servico => servico.id !== pedidoId));
  };

  const handleRecusar = (pedidoId: string) => {
    // Lógica para recusar o serviço
    alert(`Serviço ${pedidoId} recusado.`);
    setServicosPendentes(prev => prev.filter(servico => servico.id !== pedidoId));
  };

  return (
    <div className={styles.mecanicoContainer}>
      <CabecalhoMec />
      <h1>Serviços em Andamento</h1>
      
      <input
        type="text"
        placeholder="Digite o número do pedido"
        value={numeroPedido}
        onChange={(e) => setNumeroPedido(e.target.value)}
      />

      {servicosPendentes.length > 0 && (
        <div>
          <h2>Serviços Pendentes</h2>
          <ul>
            {servicosPendentes.map(servico => (
              <li key={servico.id}>
                {servico.nome} - ID: {servico.id}
                <button onClick={() => handleAceitar(servico.id)}>Aceitar</button>
                <button onClick={() => handleRecusar(servico.id)}>Recusar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MecanicoHome;
