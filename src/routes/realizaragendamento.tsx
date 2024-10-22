import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cabecalho from '../Components/Cabecalho';
import Rodape from '../Components/Rodape';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: calc(100vh - 100px); /* Ajusta para o rodapé */
`;

const MecanicasContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const MecanicaCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const MecanicaImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const FormularioContainer = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  margin-top: 20px;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Titulo = styled.h2`
  color: #000; /* Definindo a cor do texto como preto */
`;

const RealizarAgendamento = () => {
  const [selectedMecanica, setSelectedMecanica] = useState(null);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [nome, setNome] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [selectedLaudo, setSelectedLaudo] = useState('');
  const navigate = useNavigate();

  // Dados fictícios para as mecânicas e laudos
  const mecanicas = [
    {
      id: 1,
      nome: 'Mecânica Porto Seguro',
      endereco: 'Rua Alfa, 123',
      horario: '08:00 - 18:00',
      imagem: '/imagens/mec.jfif',
    },
    {
      id: 2,
      nome: 'Centro Automotivo',
      endereco: 'Rua Brasil, 456',
      horario: '09:00 - 19:00',
      imagem: '/imagens/mec2.jfif',
    },
  ];

  const laudos = [
    { id: 1, descricao: 'Laudo A' },
    { id: 2, descricao: 'Laudo B' },
  ];

  const gerarCodigo = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleAgendar = () => {
    if (!data || !hora || !nome || !veiculo || !selectedMecanica || !selectedLaudo) {
      alert('Por favor, preencha todos os campos antes de confirmar o agendamento.');
      return;
    }

    const codigo = gerarCodigo();
    const agendamento = {
      mecanica: selectedMecanica.nome,
      data,
      hora,
      nome,
      veiculo,
      laudo: selectedLaudo,
      codigo,
    };

    console.log(agendamento); // Para depuração

    try {
      const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
      agendamentos.push(agendamento);
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

      navigate('/agendamentos-realizados');
    } catch (error) {
      console.error('Erro ao acessar localStorage:', error);
      alert('Ocorreu um erro ao salvar o agendamento. Tente novamente.');
    }
  };

  return (
    <div>
      <Cabecalho />
      <Container>
        <h1>Realizar Agendamento</h1>
        <Titulo>Selecione a mecânica desejada.</Titulo>

        <MecanicasContainer>
          {mecanicas.map((mecanica) => (
            <MecanicaCard key={mecanica.id} onClick={() => setSelectedMecanica(mecanica)}>
              <MecanicaImage src={mecanica.imagem} alt={`Imagem de ${mecanica.nome}`} />
              <h3>{mecanica.nome}</h3>
              <p>{mecanica.endereco}</p>
              <p>Horário de Funcionamento: {mecanica.horario}</p>
            </MecanicaCard>
          ))}
        </MecanicasContainer>

        {console.log('Mecânica selecionada:', selectedMecanica)} {/* Para depuração */}

        <FormularioContainer isVisible={!!selectedMecanica}>
          <Titulo>Agendar com {selectedMecanica ? selectedMecanica.nome : ''}</Titulo>

          <Label>Data:</Label>
          <Input type="date" value={data} onChange={(e) => setData(e.target.value)} />

          <Label>Hora:</Label>
          <Input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />

          <Label>Nome:</Label>
          <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

          <Label>Veículo:</Label>
          <Input type="text" value={veiculo} onChange={(e) => setVeiculo(e.target.value)} />

          <Label>Laudo:</Label>
          <Select value={selectedLaudo} onChange={(e) => setSelectedLaudo(e.target.value)}>
            <option value="">Selecione</option>
            {laudos.map((laudo) => (
              <option key={laudo.id} value={laudo.descricao}>
                {laudo.descricao}
              </option>
            ))}
          </Select>

          <Button onClick={handleAgendar}>Confirmar Agendamento</Button>
        </FormularioContainer>
      </Container>
      <Rodape />
    </div>
  );
};

export default RealizarAgendamento;
