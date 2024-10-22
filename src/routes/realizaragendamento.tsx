import React, { useState } from 'react';
import styled from 'styled-components';
import Cabecalho from '../Components/Cabecalho';
import Rodape from '../Components/Rodape';

const MainContainer = styled.div`
  background-color: #1e1e1e;
  min-height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 20px;
  text-align: center;
`;

const MechanicName = styled.h3`
  margin: 0 0 10px 0;
  color: #007bff;
`;

const Info = styled.p`
  margin: 5px 0;
  color: #333;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const mechanics = [
  {
    id: 1,
    name: 'Mecânica A',
    address: 'Rua A, 123',
    phone: '(11) 98765-4321',
    hours: '08:00 - 18:00',
  },
  {
    id: 2,
    name: 'Mecânica B',
    address: 'Av. B, 456',
    phone: '(11) 91234-5678',
    hours: '09:00 - 19:00',
  },
  {
    id: 3,
    name: 'Mecânica C',
    address: 'Rua C, 789',
    phone: '(11) 99876-5432',
    hours: '07:00 - 17:00',
  },
];

const AgendarServico = () => {
  const [selectedMechanic, setSelectedMechanic] = useState<any>(null);

  const handleAgendar = (mechanic: any) => {
    setSelectedMechanic(mechanic);
    // Armazenar agendamento no localStorage ou fazer requisição para backend
    const agendamentos = localStorage.getItem('agendamentos') || '[]';
    const agendamentosArray = JSON.parse(agendamentos);
    agendamentosArray.push({
      codigo: new Date().getTime(),
      mecanica: mechanic.name,
      data: new Date().toLocaleDateString(),
      hora: '10:00', // exemplo de hora
      nome: 'Nome Cliente',
      veiculo: 'Veículo Cliente',
    });
    localStorage.setItem('agendamentos', JSON.stringify(agendamentosArray));
    alert('Agendamento realizado com sucesso!');
  };

  return (
    <MainContainer>
      <Cabecalho />
      <Title>Escolha uma Mecânica para Agendar</Title>
      <CardsContainer>
        {mechanics.map((mechanic) => (
          <Card key={mechanic.id}>
            <MechanicName>{mechanic.name}</MechanicName>
            <Info>Endereço: {mechanic.address}</Info>
            <Info>Telefone: {mechanic.phone}</Info>
            <Info>Horário: {mechanic.hours}</Info>
            <Button onClick={() => handleAgendar(mechanic)}>Agendar</Button>
          </Card>
        ))}
      </CardsContainer>
      <Rodape />
    </MainContainer>
  );
};

export default AgendarServico;
