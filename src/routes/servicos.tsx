// ../Pages/ServicosEmAndamento.tsx

import React, { useState } from 'react';
import Cabecalho from '../Components/Cabecalho';
import styled from 'styled-components';

// Modal para visualizar PDFs
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 82, 204, 0.7); /* Semi-transparente azul */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

// Modal para Ajuda
const HelpModalOverlay = styled(ModalOverlay)``;

const HelpModalContent = styled(ModalContent)`
  background-color: #f4f4f9;
`;

const HelpTitle = styled.h2`
  color: #003580;
  text-align: center;
  margin-bottom: 20px;
`;

const HelpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const RadioGroup = styled.div`
  margin-bottom: 15px;
`;

const RadioLabel = styled.label`
  margin-right: 15px;
  color: #333333;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
  font-size: 14px;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ContactInfo = styled.p`
  color: #007bff;
  font-weight: bold;
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  align-self: center;

  &:hover {
    background-color: #0056b3;
  }
`;

// Main Content
const MainContainer = styled.main`
  padding: 90px 20px 20px 20px; /* padding-top para evitar sobreposição com o cabeçalho fixo */
  background-color: #1e1e1e; /* Fundo escuro */
  min-height: 100vh;
`;

// Title
const Title = styled.h1`
  color: #ffffff; /* Texto branco */
  text-align: center;
  margin-bottom: 30px;
`;

// Search Bar
const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  margin: 0 auto 30px auto;
  display: block;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Service Card
const ServicoCard = styled.div`
  background-color: #2c2c2c; /* Fundo dos cards */
  border: 1px solid #444; /* Borda mais escura */
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5); /* Sombra mais forte */
`;

// Service Header
const ServicoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Vehicle Name
const Veiculo = styled.h2`
  color: #007bff; /* Azul Porto Seguro */
  margin: 0;
`;

// Status Badge
const StatusBadge = styled.span<{ status: string }>`
  padding: 5px 10px;
  border-radius: 20px;
  color: #ffffff;
  font-size: 12px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'Em Andamento':
        return '#007bff'; // azul
      case 'Concluído':
        return '#28a745'; // verde
      case 'Pendente':
        return '#ffc107'; // amarelo
      default:
        return '#6c757d'; // cinza
    }
  }};
`;

// Service Details
const ServicoDetails = styled.div`
  margin-top: 15px;
`;

// Detail Row
const DetailRow = styled.p`
  margin: 5px 0;
  color: #ffffff; /* Texto branco */
`;

// Parts List
const PecasList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  color: #ffffff; /* Texto branco */
`;

// Actions
const Actions = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
`;

// Action Button
const ActionButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

// Help Button
const HelpButton = styled(ActionButton)`
  background-color: #ffc107;
  color: #333333;

  &:hover {
    background-color: #e0a800;
  }
`;

// Contact Information
const ContactInfoText = styled.p`
  color: #007bff;
  font-weight: bold;
  margin-bottom: 15px;
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
}

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
  },
  // Mais serviços podem ser adicionados aqui
];

// Componente Principal
const ServicosEmAndamento: React.FC = () => {
  const [servicos, setServicos] = useState<ServicoAndamento[]>(initialServicos);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [helpFeedback, setHelpFeedback] = useState<string>('');
  const [helpComment, setHelpComment] = useState<string>('');
  const [helpContact, setHelpContact] = useState<string>('');
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter services based on search term
  const filteredServicos = servicos.filter(servico =>
    servico.veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.oficina.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servico.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open PDF in modal
  const openPdf = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
  };

  // Close PDF modal
  const closePdf = () => {
    setSelectedPdf(null);
  };

  // Open help modal
  const openHelpModal = () => {
    setIsHelpModalOpen(true);
  };

  // Close help modal
  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
    setHelpFeedback('');
    setHelpComment('');
    setHelpContact('');
  };

  // Handle help form submission
  const handleHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Feedback: ${helpFeedback}\nComment: ${helpComment}\nContact: ${helpContact}`);
    closeHelpModal();
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
          onChange={handleSearch}
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
        {selectedPdf && (
          <ModalOverlay onClick={closePdf}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <CloseButton onClick={closePdf}>×</CloseButton>
              <iframe src={selectedPdf} width="100%" height="600px" />
            </ModalContent>
          </ModalOverlay>
        )}
        {isHelpModalOpen && (
          <HelpModalOverlay onClick={closeHelpModal}>
            <HelpModalContent onClick={e => e.stopPropagation()}>
              <CloseButton onClick={closeHelpModal}>×</CloseButton>
              <HelpTitle>Ajuda</HelpTitle>
              <HelpForm onSubmit={handleHelpSubmit}>
                <RadioGroup>
                  <RadioLabel>
                    <input type="radio" value="Feedback" checked={helpFeedback === 'Feedback'} onChange={(e) => setHelpFeedback(e.target.value)} />
                    Feedback
                  </RadioLabel>
                  <RadioLabel>
                    <input type="radio" value="Sugestão" checked={helpFeedback === 'Sugestão'} onChange={(e) => setHelpFeedback(e.target.value)} />
                    Sugestão
                  </RadioLabel>
                  <RadioLabel>
                    <input type="radio" value="Reclamação" checked={helpFeedback === 'Reclamação'} onChange={(e) => setHelpFeedback(e.target.value)} />
                    Reclamação
                  </RadioLabel>
                </RadioGroup>
                <TextArea placeholder="Comentário" value={helpComment} onChange={(e) => setHelpComment(e.target.value)} rows={5} />
                <ContactInfo>Seu contato (e-mail ou telefone):</ContactInfo>
                <Select value={helpContact} onChange={(e) => setHelpContact(e.target.value)}>
                  <option value="">Selecione...</option>
                  <option value="email">E-mail</option>
                  <option value="telefone">Telefone</option>
                </Select>
                <SubmitButton type="submit">Enviar</SubmitButton>
              </HelpForm>
            </HelpModalContent>
          </HelpModalOverlay>
        )}
      </MainContainer>
    </>
  );
};

export default ServicosEmAndamento;
