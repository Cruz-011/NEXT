import React, { useEffect, useState } from 'react';
import CabecalhoMec from '../Components/CabecalhoMec';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const MainContainer = styled.div`
  background-color: #1a1a1d;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box; 
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 20px;
  min-width: 300px; 
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  color: black;
  width: 100%; 
  box-sizing: border-box; 
`;

const Title = styled.h1`
  color: #0033a0;
  text-align: center;
  margin-bottom: 20px;
`;

const ServicesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceItem = styled.li`
  background-color: #e9ecef;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ServiceDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewDetailsButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  margin-right: 10px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const CompleteButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const DetailsContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  position: relative;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff0000;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: #b30000;
  }
`;

const DetailItem = styled.p`
  margin: 10px 0;
  color: #333;
  font-size: 16px;
`;

const MecanicoHome: React.FC = () => {
  const [servicosEmAndamento, setServicosEmAndamento] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);

  useEffect(() => {
    const storedServicos = localStorage.getItem('servicosEmAndamento');
    if (storedServicos) {
      try {
        const parsedServicos = JSON.parse(storedServicos);
        setServicosEmAndamento(parsedServicos);
      } catch (error) {
        console.error("Erro ao parsear serviços em andamento:", error);
      }
    }
  }, []);

  const handleComplete = (codigo: string) => {
    const updatedServicos = servicosEmAndamento.filter((servico) => servico.codigo !== codigo);
    const servicoCompleto = servicosEmAndamento.find((servico) => servico.codigo === codigo);

    const storedConcluidos = localStorage.getItem('servicosConcluidos') || '[]';
    const servicosConcluidos = JSON.parse(storedConcluidos);
    if (servicoCompleto) {
      servicosConcluidos.push(servicoCompleto);
    }

    setServicosEmAndamento(updatedServicos);
    localStorage.setItem('servicosEmAndamento', JSON.stringify(updatedServicos));
    localStorage.setItem('servicosConcluidos', JSON.stringify(servicosConcluidos));

    window.location.href = '/servicos-concl'; 
  };

  const handleViewDetails = (servico: any) => {
    setSelectedService(servico);
  };

  const handleCloseDetails = () => {
    setSelectedService(null);
  };

  return (
    <MainContainer>
      <CabecalhoMec />
      <ContentContainer>
        <Title>Serviços em Andamento</Title>

        {servicosEmAndamento.length === 0 ? (
          <p>Não há serviços em andamento.</p>
        ) : (
          <ServicesList>
            {servicosEmAndamento.map((servico) => (
              <ServiceItem key={servico.codigo}>
                <ServiceDetails>
                  <strong>{servico.nome}</strong>
                  <span>{servico.veiculo}</span>
                </ServiceDetails>
                <div>
                  <ViewDetailsButton onClick={() => handleViewDetails(servico)}>
                    Ver Detalhes
                  </ViewDetailsButton>
                  <CompleteButton onClick={() => handleComplete(servico.codigo)}>
                    Completar
                  </CompleteButton>
                </div>
              </ServiceItem>
            ))}
          </ServicesList>
        )}

        {selectedService && (
          <DetailsContainer>
            <CloseButton onClick={handleCloseDetails}>
              <FaTimes />
            </CloseButton>
            <DetailItem>
              <strong>Código:</strong> {selectedService.codigo}
            </DetailItem>
            <DetailItem>
              <strong>Nome:</strong> {selectedService.nome}
            </DetailItem>
            <DetailItem>
              <strong>Veículo:</strong> {selectedService.veiculo}
            </DetailItem>
            <DetailItem>
              <strong>Data:</strong> {selectedService.data}
            </DetailItem>
            <DetailItem>
              <strong>Hora:</strong> {selectedService.hora}
            </DetailItem>
            <DetailItem>
              <strong>Status:</strong> Em andamento
            </DetailItem>
            <DetailItem>
              <strong>Preço Estipulado:</strong> R$ {selectedService.preco?.toFixed(2) || 'N/A'}
            </DetailItem>
            <DetailItem>
              <strong>O que será realizado:</strong> {selectedService.laudo}
            </DetailItem>
          </DetailsContainer>
        )}
      </ContentContainer>
    </MainContainer>
  );
};

export default MecanicoHome;
