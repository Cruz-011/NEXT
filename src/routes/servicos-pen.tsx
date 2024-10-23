import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaTimes } from 'react-icons/fa';
import CabecalhoMec from '../Components/CabecalhoMec';
import Rodape from '../Components/Rodape';

const MainContainer = styled.div`
  background-color: #1e1e1e;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  max-width: 1500px;
  margin: 20px;
  width: 100%;
`;

const Title = styled.h1`
  color: #0033a0;
  text-align: center;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media (max-width: 480px) {
    max-width: 100%; // ocupa toda a largura da tela em dispositivos menores
    padding: 8px;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin: 20px 0;
  background-color: #000;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;

  @media (max-width: 900px) {
    min-width: 600px; // reduz a largura mínima em telas menores
  }
`;

const StyledThead = styled.thead`
  background-color: #0033a0;
  color: white;
`;

const StyledTh = styled.th`
  padding: 14px 16px;
  text-align: left;
  font-weight: bold;

  @media (max-width: 480px) {
    padding: 10px; // ajusta o padding em telas menores
  }
`;

const StyledTbody = styled.tbody`
  background-color: #fff;
`;

const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #e6e6e6;
  }
`;

const StyledTd = styled.td`
  padding: 14px 16px;
  border-bottom: 1px solid #ddd;
  color: #333;

  @media (max-width: 480px) {
    padding: 10px; // ajusta o padding em telas menores
    font-size: 14px; // reduz o tamanho da fonte em telas menores
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column; // muda a direção dos botões para coluna em telas menores
    align-items: flex-start; // alinha os botões à esquerda
  }
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    color: #0056b3;
  }
`;

const NoPendentes = styled.p`
  text-align: center;
  color: #333;
  font-size: 18px;
`;

const DetailsContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  position: relative;

  @media (max-width: 480px) {
    padding: 15px; // ajusta o padding em telas menores
  }
`;

const DetailItem = styled.p`
  margin: 10px 0;
  color: #333;
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 14px; // reduz o tamanho da fonte em telas menores
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: #ff0000;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    color: #b30000;
  }
`;

const AcceptButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const RejectButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const Pendentes = () => {
  const [pendentes, setPendentes] = useState<any[]>([
    { codigo: '001', data: '2024-10-01', hora: '10:00', veiculo: 'Fusca', nome: 'Serviço 1', mecanica: 'Mecânica 1', enderecoMecanica: 'Endereço 1', laudo: 'Laudo 1' },
    { codigo: '002', data: '2024-10-02', hora: '11:00', veiculo: 'Civic', nome: 'Serviço 2', mecanica: 'Mecânica 2', enderecoMecanica: 'Endereço 2', laudo: 'Laudo 2' },
    { codigo: '003', data: '2024-10-03', hora: '12:00', veiculo: 'Corolla', nome: 'Serviço 3', mecanica: 'Mecânica 3', enderecoMecanica: 'Endereço 3', laudo: 'Laudo 3' },
  ]);
  const [selectedPendente, setSelectedPendente] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedPendentes = localStorage.getItem('pendentes');
    if (storedPendentes) {
      try {
        const parsedPendentes = JSON.parse(storedPendentes);
        setPendentes(parsedPendentes);
      } catch (error) {
        console.error("Erro ao parsear pendentes:", error);
      }
    }
  }, []);

  const handleViewDetails = (pendente: any) => {
    setSelectedPendente(pendente);
  };

  const handleCloseDetails = () => {
    setSelectedPendente(null);
  };

  const handleAccept = (codigo: string) => {
    const updatedPendentes = pendentes.filter(pendente => pendente.codigo !== codigo);
    setPendentes(updatedPendentes);
    localStorage.setItem('pendentes', JSON.stringify(updatedPendentes));

    const newService = pendentes.find(pendente => pendente.codigo === codigo);
    if (newService) {
      const ongoingServices = JSON.parse(localStorage.getItem('servicosEmAndamento') || '[]');
      ongoingServices.push(newService);
      localStorage.setItem('servicosEmAndamento', JSON.stringify(ongoingServices));
    }

    // Navega para a página de serviços em andamento
    navigate('/Mecanico');
  };

  const handleReject = (codigo: string) => {
    const updatedPendentes = pendentes.filter(pendente => pendente.codigo !== codigo);
    setPendentes(updatedPendentes);
    localStorage.setItem('pendentes', JSON.stringify(updatedPendentes));
  };

  const filteredPendentes = pendentes.filter(pendente =>
    pendente.codigo.includes(searchTerm)
  );

  return (
    <MainContainer>
      <CabecalhoMec />
      <ContentContainer>
        <Title>Pendentes</Title>

        <SearchInput
          type="text"
          placeholder="Pesquisar pelo código"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredPendentes.length === 0 ? (
          <NoPendentes>Não há pendentes.</NoPendentes>
        ) : (
          <TableContainer>
            <StyledTable>
              <StyledThead>
                <tr>
                  <StyledTh>Código</StyledTh>
                  <StyledTh>Data</StyledTh>
                  <StyledTh>Hora</StyledTh>
                  <StyledTh>Veículo</StyledTh>
                  <StyledTh>Ações</StyledTh>
                </tr>
              </StyledThead>
              <StyledTbody>
                {filteredPendentes.map((pendente, index) => (
                  <StyledTr key={index}>
                    <StyledTd>{pendente.codigo}</StyledTd>
                    <StyledTd>{pendente.data}</StyledTd>
                    <StyledTd>{pendente.hora}</StyledTd>
                    <StyledTd>{pendente.veiculo}</StyledTd>
                    <StyledTd>
                      <ActionButtons>
                        <IconButton onClick={() => handleViewDetails(pendente)}>
                          <FaEye />
                        </IconButton>
                        <IconButton onClick={() => handleReject(pendente.codigo)}>
                          <FaTimes />
                        </IconButton>
                      </ActionButtons>
                    </StyledTd>
                  </StyledTr>
                ))}
              </StyledTbody>
            </StyledTable>
          </TableContainer>
        )}

        {selectedPendente && (
          <DetailsContainer>
            <CloseButton onClick={handleCloseDetails}>×</CloseButton>
            <Title>Detalhes do Serviço</Title>
            <DetailItem>Código: {selectedPendente.codigo}</DetailItem>
            <DetailItem>Data: {selectedPendente.data}</DetailItem>
            <DetailItem>Hora: {selectedPendente.hora}</DetailItem>
            <DetailItem>Veículo: {selectedPendente.veiculo}</DetailItem>
            <DetailItem>Nome: {selectedPendente.nome}</DetailItem>
            <DetailItem>Mecânica: {selectedPendente.mecanica}</DetailItem>
            <DetailItem>Endereço: {selectedPendente.enderecoMecanica}</DetailItem>
            <DetailItem>Laudo: {selectedPendente.laudo}</DetailItem>
            <ActionButtons>
              <AcceptButton onClick={() => handleAccept(selectedPendente.codigo)}>Aceitar</AcceptButton>
              <RejectButton onClick={() => handleReject(selectedPendente.codigo)}>Recusar</RejectButton>
            </ActionButtons>
          </DetailsContainer>
        )}
      </ContentContainer>
      <Rodape />
    </MainContainer>
  );
};

export default Pendentes;
