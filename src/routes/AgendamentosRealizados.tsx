import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaTrash } from 'react-icons/fa';
import Cabecalho from '../Components/Cabecalho';
import Rodape from '../Components/Rodape';

const MainContainer = styled.div`
  background-color: #1e1e1e;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`;

const StyledThead = styled.thead`
  background-color: #007bff;
  color: white;
`;

const StyledTh = styled.th`
  padding: 12px 15px;
  text-align: left;
  cursor: pointer;
`;

const StyledTbody = styled.tbody`
  background-color: #ffffff;
`;

const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const StyledTd = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  color: #333;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: #0056b3;
  }
`;

const AgendamentosRealizados = () => {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const navigate = useNavigate();

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



  return (
    <MainContainer>
      <Cabecalho />
      <Title>Agendamentos Realizados</Title>

      {agendamentos.length === 0 ? (
        <p>Não há agendamentos realizados.</p>
      ) : (
        <TableContainer>
          <StyledTable>
            <StyledThead>
              <tr>
                <StyledTh>Código</StyledTh>
                <StyledTh>Mecânica</StyledTh>
                <StyledTh>Data</StyledTh>
                <StyledTh>Hora</StyledTh>
                <StyledTh>Nome</StyledTh>
                <StyledTh>Veículo</StyledTh>
                <StyledTh>Ações</StyledTh>
              </tr>
            </StyledThead>
            <StyledTbody>
              {agendamentos.map((agendamento, index) => (
                <StyledTr key={index}>
                  <StyledTd>{agendamento.codigo}</StyledTd>
                  <StyledTd>{agendamento.mecanica}</StyledTd>
                  <StyledTd>{agendamento.data}</StyledTd>
                  <StyledTd>{agendamento.hora}</StyledTd>
                  <StyledTd>{agendamento.nome}</StyledTd>
                  <StyledTd>{agendamento.veiculo}</StyledTd>
                  <StyledTd>
                    <ActionButtons>
                      <IconButton>
                        <FaEye />
                      </IconButton>
                    </ActionButtons>
                  </StyledTd>
                </StyledTr>
              ))}
            </StyledTbody>
          </StyledTable>
        </TableContainer>
      )}

    </MainContainer>
  );
};

export default AgendamentosRealizados;
