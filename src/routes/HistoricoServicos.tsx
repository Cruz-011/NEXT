// ../Pages/HistoricoServicos.tsx

import React, { useState, useMemo } from 'react';
import Cabecalho from '../Components/Cabecalho';
import styled from 'styled-components';
import { FaSort, FaSortUp, FaSortDown, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Interface para Serviço
interface Servico {
  id: number;
  descricao: string;
  status: 'Concluído' | 'Cancelado' | 'Em andamento';
  veiculo: string;
  data: string; // Formato: 'DD/MM/YYYY'
}

// Dados Iniciais de Serviços (Mock)
const initialServicos: Servico[] = [
  {
    id: 1,
    descricao: 'Troca de óleo',
    status: 'Concluído',
    veiculo: 'Honda Civic 2020',
    data: '15/09/2024',
  },
  {
    id: 2,
    descricao: 'Revisão de freios',
    status: 'Em andamento',
    veiculo: 'Toyota Corolla 2019',
    data: '16/09/2024',
  },
  {
    id: 3,
    descricao: 'Alinhamento e balanceamento',
    status: 'Concluído',
    veiculo: 'Ford Ka 2018',
    data: '17/09/2024',
  },
  {
    id: 4,
    descricao: 'Substituição de amortecedores',
    status: 'Cancelado',
    veiculo: 'Chevrolet Onix 2021',
    data: '18/09/2024',
  },
  // Adicione mais serviços conforme necessário
];

// Styled Components

const MainContainer = styled.main`
  padding: 100px 20px 20px 20px; /* padding-top para evitar sobreposição com o cabeçalho fixo */
  background-color: #1e1e1e;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: white; /* Azul escuro */
  text-align: center;
  margin-bottom: 30px;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 48%;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const StatusFilter = styled.select`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 48%;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

interface StyledThProps {
  isSorted: boolean;
  sortDirection: 'ascending' | 'descending' | '';
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`;

const StyledThead = styled.thead`
  background-color: #007bff;
  color: black;
`;

const StyledTh = styled.th<StyledThProps>`
  padding: 12px 15px;
  text-align: left;
  cursor: pointer;
  position: relative;
  
  &:hover {
    background-color: #0056b3;
  }
  
  svg {
    margin-left: 5px;
    font-size: 12px;
  }
`;

const StyledTbody = styled.tbody`
  background-color: #ffffff;
`;

interface StyledTrProps {
  isEven: boolean;
}

const StyledTr = styled.tr<StyledTrProps>`
  background-color: ${({ isEven }) => (isEven ? '#f9f9f9' : '#ffffff')};
  
  &:hover {
    background-color: #f1f1f1;
  }
`;

const StyledTd = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  color: black;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 5px 10px;
  border-radius: 12px;
  color: #ffffff;
  font-size: 12px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'Concluído':
        return '#28a745'; // Verde
      case 'Cancelado':
        return '#dc3545'; // Vermelho
      case 'Em andamento':
        return '#ffc107'; // Amarelo
      default:
        return '#6c757d'; // Cinza
    }
  }};
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

// Pagination Styles
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  
  .pagination {
    display: flex;
    list-style: none;
    gap: 10px;
    padding: 0;
  }
  
  .page {
    cursor: pointer;
    padding: 8px 12px;
    border: 1px solid #007bff;
    border-radius: 5px;
    color: #007bff;
    
    &.selected {
      background-color: #007bff;
      color: #ffffff;
    }
    
    &:hover:not(.selected) {
      background-color: #e0e0e0;
    }
    
    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

// Help Button Styles
const HelpButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 24px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #0056b3;
  }
  
  @media (max-width: 600px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
`;

// Modal Styles
const ModalOverlay = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1e1e1e;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
  
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  
  &:hover {
    color: #dc3545;
  }
`;

const HistoricoServicos: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[]>(initialServicos);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Servico; direction: 'ascending' | 'descending' } | null>(null);

  // Estados para o Modal de Ajuda
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [helpName, setHelpName] = useState<string>('');

  const itemsPerPage = 3; // Quantos itens por página

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const filteredServicos = useMemo(() => {
    return servicos.filter((servico) => {
      const matchesSearch = searchTerm === '' || servico.descricao.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || servico.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [servicos, searchTerm, statusFilter]);

  const sortedServicos = useMemo(() => {
    if (sortConfig !== null) {
      const sorted = [...filteredServicos].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    }
    return filteredServicos;
  }, [filteredServicos, sortConfig]);

  const handleSort = (key: keyof Servico) => {
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      setSortConfig({ key, direction: 'descending' });
    } else {
      setSortConfig({ key, direction: 'ascending' });
    }
  };

  const getSortIcon = (key: keyof Servico) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <FaSort />;
    }
    if (sortConfig.direction === 'ascending') {
      return <FaSortUp />;
    }
    return <FaSortDown />;
  };

  const pageCount = Math.ceil(sortedServicos.length / itemsPerPage);
  const paginatedServicos = sortedServicos.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const openHelpModal = () => {
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
  };

  // Funções para edição e exclusão
  const handleDelete = (id: number) => {
    setServicos((prevServicos) => prevServicos.filter((servico) => servico.id !== id));
    toast.success('Serviço excluído com sucesso!');
  };

  const handleEdit = (id: number) => {
    toast.info(`Editar serviço com ID: ${id}`);
  };

  return (
    <>
      <Cabecalho />
      <MainContainer>
        <Title>Histórico de Serviços</Title>
        <SearchFilterContainer>
          <SearchInput
            type="text"
            placeholder="Buscar serviço..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <StatusFilter value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="Todos">Todos os status</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
            <option value="Em andamento">Em andamento</option>
          </StatusFilter>
        </SearchFilterContainer>
        <TableContainer>
          <StyledTable>
            <StyledThead>
              <tr>
                <StyledTh isSorted={sortConfig?.key === 'descricao'} sortDirection={sortConfig?.direction}>
                  Descrição
                  <span onClick={() => handleSort('descricao')}>{getSortIcon('descricao')}</span>
                </StyledTh>
                <StyledTh isSorted={sortConfig?.key === 'status'} sortDirection={sortConfig?.direction}>
                  Status
                  <span onClick={() => handleSort('status')}>{getSortIcon('status')}</span>
                </StyledTh>
                <StyledTh isSorted={sortConfig?.key === 'veiculo'} sortDirection={sortConfig?.direction}>
                  Veículo
                  <span onClick={() => handleSort('veiculo')}>{getSortIcon('veiculo')}</span>
                </StyledTh>
                <StyledTh isSorted={sortConfig?.key === 'data'} sortDirection={sortConfig?.direction}>
                  Data
                  <span onClick={() => handleSort('data')}>{getSortIcon('data')}</span>
                </StyledTh>
                <StyledTh isSorted={false} sortDirection="">
                  Ações
                </StyledTh>
              </tr>
            </StyledThead>
            <StyledTbody>
              {paginatedServicos.map((servico, index) => (
                <StyledTr key={servico.id} isEven={index % 2 === 0}>
                  <StyledTd>{servico.descricao}</StyledTd>
                  <StyledTd>
                    <StatusBadge status={servico.status}>{servico.status}</StatusBadge>
                  </StyledTd>
                  <StyledTd>{servico.veiculo}</StyledTd>
                  <StyledTd>{servico.data}</StyledTd>
                  <StyledTd>
                    <ActionButtons>
                      <IconButton onClick={() => toast.info(`Visualizar serviço com ID: ${servico.id}`)}>
                        <FaEye />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(servico.id)}>
                        <FaEdit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(servico.id)}>
                        <FaTrash />
                      </IconButton>
                    </ActionButtons>
                  </StyledTd>
                </StyledTr>
              ))}
            </StyledTbody>
          </StyledTable>
        </TableContainer>
        <PaginationContainer>
          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Próximo'}
            breakLabel={'...'}
            breakClassName={'page'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'selected'}
            pageClassName={'page'}
            previousClassName={'page'}
            nextClassName={'page'}
            disabledClassName={'disabled'}
          />
        </PaginationContainer>
        <HelpButton onClick={openHelpModal}>?</HelpButton>
        <ModalOverlay isVisible={isHelpModalOpen}>
          <ModalContent>
            <CloseButton onClick={closeHelpModal}>&times;</CloseButton>
            <h2>Ajuda</h2>
            <p>Se você precisar de ajuda com o uso do sistema, entre em contato com nossa equipe de suporte técnico.</p>
            <p>Nome: {helpName}</p>
          </ModalContent>
        </ModalOverlay>
      </MainContainer>
      <ToastContainer />
    </>
  );
};

export default HistoricoServicos;
