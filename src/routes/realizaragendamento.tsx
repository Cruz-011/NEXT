import React, { useState } from 'react';
import styled from 'styled-components';
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

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
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

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  margin-bottom: 10px;
`;

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

const mechanics = [
  {
    id: 1,
    name: 'Mecânica Alfa',
    address: 'Rua das Flores, 100',
    phone: '(11) 98765-4321',
    hours: '08:00 - 18:00',
    imageUrl: '/imagens/mec.jfif', // Adicione sua URL de imagem
  },
  {
    id: 2,
    name: 'Mecânica Beta',
    address: 'Av. Central, 456',
    phone: '(11) 91234-5678',
    hours: '09:00 - 19:00',
    imageUrl: '/imagens/mec2.jfif', // Adicione sua URL de imagem
  },
  {
    id: 3,
    name: 'Mecânica Gama',
    address: 'Rua da Paz, 789',
    phone: '(11) 99876-5432',
    hours: '07:00 - 17:00',
    imageUrl: '/imagens/mec3.jfif', // Adicione sua URL de imagem
  },
];

const AgendarServico = () => {
  const [selectedMechanic, setSelectedMechanic] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    laudo: '',
    vehicle: '',
  });

  const handleAgendar = (mechanic: any) => {
    setSelectedMechanic(mechanic);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const agendamentos = localStorage.getItem('agendamentos') || '[]';
    const agendamentosArray = JSON.parse(agendamentos);
    agendamentosArray.push({
      codigo: new Date().getTime(),
      mecanica: selectedMechanic.name,
      data: formData.date,
      hora: formData.time,
      nome: formData.name,
      veiculo: formData.vehicle,
      laudo: formData.laudo,
    });
    localStorage.setItem('agendamentos', JSON.stringify(agendamentosArray));
    alert('Agendamento realizado com sucesso!');
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <MainContainer>
      <Cabecalho />
      <Title>Escolha uma Mecânica para Agendar</Title>
      <CardsContainer>
        {mechanics.map((mechanic) => (
          <Card key={mechanic.id}>
            <Image src={mechanic.imageUrl} alt={mechanic.name} />
            <MechanicName>{mechanic.name}</MechanicName>
            <Info>Endereço: {mechanic.address}</Info>
            <Info>Telefone: {mechanic.phone}</Info>
            <Info>Horário: {mechanic.hours}</Info>
            <Button onClick={() => handleAgendar(mechanic)}>Agendar</Button>
          </Card>
        ))}
      </CardsContainer>

      {showModal && (
        <Modal>
          <FormContainer>
            <h2>Agendar Serviço - {selectedMechanic?.name}</h2>
            <form onSubmit={handleSubmit}>
              <FormField>
                <Label htmlFor="name">Nome:</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <FormField>
                <Label htmlFor="date">Dia:</Label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <FormField>
                <Label htmlFor="time">Horário:</Label>
                <Input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <FormField>
                <Label htmlFor="laudo">Selecione o Laudo:</Label>
                <Select
                  id="laudo"
                  name="laudo"
                  value={formData.laudo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Laudo de Freios">Laudo de Freios</option>
                  <option value="Laudo de Suspensão">Laudo de Suspensão</option>
                  <option value="Laudo de Motor">Laudo de Motor</option>
                </Select>
              </FormField>
              <FormField>
                <Label htmlFor="vehicle">Nome do Veículo:</Label>
                <Input
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <SubmitButton type="submit">Confirmar Agendamento</SubmitButton>
            </form>
          </FormContainer>
        </Modal>
      )}
      <Rodape />
    </MainContainer>
  );
};

export default AgendarServico;