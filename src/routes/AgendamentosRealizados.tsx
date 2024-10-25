import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaTimes } from 'react-icons/fa';
import Cabecalho from '../Components/Cabecalho';
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
  width: 100%; /* Adicionado para largura total */
`;

const Title = styled.h1`
  color: #0033a0;
  text-align: center;
  font-size: 24px; /* Tamanho da fonte ajustado */
  
  @media (max-width: 600px) {
    font-size: 20px; /* Tamanho da fonte em telas menores */
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin: 20px 0;
  background-color: #black;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;

  @media (max-width: 900px) {
    min-width: 100%; /* Ajusta a largura mínima em telas menores */
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

  @media (max-width: 600px) {
    padding: 10px; /* Ajusta o padding em telas menores */
    font-size: 14px; /* Tamanho da fonte em telas menores */
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

  @media (max-width: 600px) {
    padding: 10px; /* Ajusta o padding em telas menores */
    font-size: 14px; /* Tamanho da fonte em telas menores */
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
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

const NoAgendamentos = styled.p`
  text-align: center;
  color: #333;
  font-size: 18px;

  @media (max-width: 600px) {
    font-size: 16px; /* Tamanho da fonte em telas menores */
  }
`;

const DetailsContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  position: relative;

  @media (max-width: 600px) {
    padding: 15px; /* Ajusta o padding em telas menores */
  }
`;

const DetailItem = styled.p`
  margin: 10px 0;
  color: #333;
  font-size: 16px;

  @media (max-width: 600px) {
    font-size: 14px; /* Tamanho da fonte em telas menores */
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

const CancelButton = styled.button`
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #b30000;
  }
`;

const AgendamentosRealizados = () => {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [selectedAgendamento, setSelectedAgendamento] = useState<any | null>(null);

  useEffect(() => {
    const storedAgendamentos = localStorage.getItem('agendamentos');
    if (storedAgendamentos) {
      try {
        const parsedAgendamentos = JSON.parse(storedAgendamentos);
        setAgendamentos(parsedAgendamentos);
      } catch (error) {
        console.error("Erro ao parsear agendamentos:", error);
      }
    }
  }, []);

  const handleViewDetails = (agendamento: any) => {
    setSelectedAgendamento(agendamento);
  };

  const handleCloseDetails = () => {
    setSelectedAgendamento(null);
  };

  const handleCancelAgendamento = (codigo: string) => {
    const updatedAgendamentos = agendamentos.filter(agendamento => agendamento.codigo !== codigo);
    setAgendamentos(updatedAgendamentos);
    localStorage.setItem('agendamentos', JSON.stringify(updatedAgendamentos));
  };

  return (
    <MainContainer>
      <Cabecalho />
      <ContentContainer>
        <Title>Agendamentos Realizados</Title>

        {agendamentos.length === 0 ? (
          <NoAgendamentos>Não há agendamentos realizados.</NoAgendamentos>
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
                {agendamentos.map((agendamento, index) => (
                  <StyledTr key={index}>
                    <StyledTd>{agendamento.codigo}</StyledTd>
                    <StyledTd>{agendamento.data}</StyledTd>
                    <StyledTd>{agendamento.hora}</StyledTd>
                    <StyledTd>{agendamento.veiculo}</StyledTd>
                    <StyledTd>
                      <ActionButtons>
                        <IconButton onClick={() => handleViewDetails(agendamento)}>
                          <FaEye />
                        </IconButton>
                        <CancelButton onClick={() => handleCancelAgendamento(agendamento.codigo)}>
                          Cancelar
                        </CancelButton>
                      </ActionButtons>
                    </StyledTd>
                  </StyledTr>
                ))}
              </StyledTbody>
            </StyledTable>
          </TableContainer>
        )}

        {selectedAgendamento && (
          <DetailsContainer>
            <CloseButton onClick={handleCloseDetails}>
              <FaTimes />
            </CloseButton>
            <DetailItem><strong>Código:</strong> {selectedAgendamento.codigo}</DetailItem>
            <DetailItem><strong>Nome:</strong> {selectedAgendamento.nome}</DetailItem>
            <DetailItem><strong>Data:</strong> {selectedAgendamento.data}</DetailItem>
            <DetailItem><strong>Hora:</strong> {selectedAgendamento.hora}</DetailItem>
            <DetailItem><strong>Veículo:</strong> {selectedAgendamento.veiculo}</DetailItem>
            <DetailItem><strong>Mecânica:</strong> {selectedAgendamento.mecanica}</DetailItem>
            <DetailItem><strong>Endereço da Mecânica:</strong> {selectedAgendamento.enderecoMecanica}</DetailItem>
            <DetailItem><strong>Laudo:</strong> {selectedAgendamento.laudo}</DetailItem>
          </DetailsContainer>
        )}
      </ContentContainer>
      <Rodape />
    </MainContainer>
  );
};

export default AgendamentosRealizados;
