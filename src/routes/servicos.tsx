// ../Pages/ServicosEmAndamento.tsx

import React, { useState } from 'react';
import Cabecalho from '../Components/Cabecalho';
import styled from 'styled-components';

// Estilos
const MainContainer = styled.div`

  padding: 20px;
  background-color: #3a3a3a;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ServicoCard = styled.div`
  
  background-color:  #2c2c2c;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ServicoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Veiculo = styled.h2`
  color: white;
  font-size: 18px;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.status === 'Em Andamento' ? '#ffcc00' : '#4caf50')};
  color: #fff;
`;

const ServicoDetails = styled.div`
  margin-top: 10px;
`;

const DetailRow = styled.p`
  margin: 5px 0;
`;

const PecasList = styled.ul`
  margin: 5px 0;
  padding-left: 20px;
`;

const Actions = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const HelpButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

// Interface para Serviço em Andamento
interface ServicoAndamento {
  veiculo: string;
  oficina: string;
  dia: string;
  problema: string;
  pecas: string[];
  previsaoConclusao: string;
  telefoneContato: string;
  pdfOrcamento: string;
  status: string; // e.g., 'Em Andamento', 'Concluído', 'Pendente'
  codigo: string; // Adicionando a propriedade do código
}

// Função para gerar código aleatório de 8 dígitos
const gerarCodigo = (): string => {
  return Math.random().toString(36).substr(2, 8).toUpperCase(); // Gera um código de 8 caracteres
};

// Dados Iniciais de Serviços
const initialServicos: ServicoAndamento[] = [
  {
    veiculo: 'Toyota Corolla 2019',
    oficina: 'Oficina ABC',
    dia: '16/09/2024',
    problema: 'Revisão de freios',
    pecas: ['Disco de freio - R$ 300', 'Pastilhas de freio - R$ 150'],
    previsaoConclusao: '20/09/2024',
    telefoneContato: '(11) 99999-9999',
    pdfOrcamento: '/ordem-de-servico.pdf',
    status: 'Em Andamento',
    codigo: gerarCodigo(), // Gerando o código aleatório
  },
  {
    veiculo: 'Honda Civic 2020',
    oficina: 'Oficina XYZ',
    dia: '17/09/2024',
    problema: 'Troca de óleo',
    pecas: ['Óleo - R$ 120', 'Filtro de óleo - R$ 40'],
    previsaoConclusao: '22/09/2024',
    telefoneContato: '(11) 98888-8888',
    pdfOrcamento: '/ordem-de-servico-civic.pdf',
    status: 'Pendente',
    codigo: gerarCodigo(), // Gerando o código aleatório
  },
  // Mais serviços podem ser adicionados aqui
];

// Componente Principal
const ServicosEmAndamento: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServicos = initialServicos.filter((servico) =>
    servico.veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.oficina.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPdf = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
  };

  const openHelpModal = () => {
    alert('Esta funcionalidade será implementada em breve!');
  };

  return (
    <>
      <Cabecalho />
      <MainContainer>
        <Title>Serviços em Andamento</Title>
        <SearchBar
          type="text"
          placeholder="Pesquisar por veículo, oficina ou status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredServicos.map((servico, index) => (
          <ServicoCard key={index}>
            <ServicoHeader>
              <Veiculo>{servico.veiculo}</Veiculo>
              <StatusBadge status={servico.status}>{servico.status}</StatusBadge>
            </ServicoHeader>
            <ServicoDetails>
              <DetailRow><strong>Oficina:</strong> {servico.oficina}</DetailRow>
              <DetailRow><strong>Dia:</strong> {servico.dia}</DetailRow>
              <DetailRow><strong>Problema:</strong> {servico.problema}</DetailRow>
              <DetailRow><strong>Previsão de Conclusão:</strong> {servico.previsaoConclusao}</DetailRow>
              <DetailRow><strong>Telefone de Contato:</strong> {servico.telefoneContato}</DetailRow>
              <DetailRow><strong>Código:</strong> {servico.codigo}</DetailRow> {/* Exibindo o código */}
              <DetailRow><strong>Peças:</strong></DetailRow>
              <PecasList>
                {servico.pecas.map((peca, index) => (
                  <li key={index}>{peca}</li>
                ))}
              </PecasList>
            </ServicoDetails>
            <Actions>
              <ActionButton onClick={() => openPdf(servico.pdfOrcamento)}>Visualizar PDF</ActionButton>
              <HelpButton onClick={openHelpModal}>Ajuda</HelpButton>
            </Actions>
          </ServicoCard>
        ))}
      </MainContainer>
    </>
  );
};

export default ServicosEmAndamento;
