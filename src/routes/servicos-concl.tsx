import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CabecalhoMec from '../Components/CabecalhoMec';

const MainContainer = styled.div`
  background-color: #1a1a1d;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 20px;
  min-width: 800px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  color: black;
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

const DetailItem = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #333;
`;

const ServicosConcluidos: React.FC = () => {
  const [servicosConcluidos, setServicosConcluidos] = useState<any[]>([]);

  useEffect(() => {
    const storedConcluidos = localStorage.getItem('servicosConcluidos');
    if (storedConcluidos) {
      try {
        const parsedConcluidos = JSON.parse(storedConcluidos);
        setServicosConcluidos(parsedConcluidos);
      } catch (error) {
        console.error("Erro ao parsear serviços concluídos:", error);
      }
    }
  }, []);

  return (
    <MainContainer>
      <CabecalhoMec />
      <ContentContainer>
        <Title>Serviços Concluídos</Title>

        {servicosConcluidos.length === 0 ? (
          <p>Não há serviços concluídos.</p>
        ) : (
          <ServicesList>
            {servicosConcluidos.map((servico) => (
              <ServiceItem key={servico.codigo}>
                <ServiceDetails>
                  <strong>{servico.nome}</strong>
                  <DetailItem><strong>Veículo:</strong> {servico.veiculo}</DetailItem>
                  <DetailItem><strong>Data:</strong> {servico.data}</DetailItem>
                  <DetailItem><strong>Hora:</strong> {servico.hora}</DetailItem>
                  <DetailItem><strong>Preço:</strong> R$ {servico.preco?.toFixed(2)}</DetailItem>
                </ServiceDetails>
              </ServiceItem>
            ))}
          </ServicesList>
        )}
      </ContentContainer>
    </MainContainer>
  );
};

export default ServicosConcluidos;
