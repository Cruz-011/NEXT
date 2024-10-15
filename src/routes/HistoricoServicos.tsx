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
  background-color: #1e1e1e;;
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
  const [helpEmail, setHelpEmail] = useState<string>('');
  const [helpDescription, setHelpDescription] = useState<string>('');

  const itemsPerPage = 5;

  // Função para ordenar os serviços
  const sortedServicos = useMemo(() => {
    let sortableServicos = [...servicos];

    if (sortConfig !== null) {
      sortableServicos.sort((a, b) => {
        let aKey = a[sortConfig.key];
        let bKey = b[sortConfig.key];

        // Converter datas para comparações corretas
        if (sortConfig.key === 'data') {
          // Garantir que aKey e bKey são strings antes de chamar .split
          if (typeof aKey === 'string' && typeof bKey === 'string') {
            const [dayA, monthA, yearA] = aKey.split('/').map(Number);
            const [dayB, monthB, yearB] = bKey.split('/').map(Number);
            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);

            if (dateA < dateB) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (dateA > dateB) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
          } else {
            // Se não forem strings, tratar como iguais
            return 0;
          }
        }

        // Comparação padrão para outros campos (string)
        if (typeof aKey === 'string' && typeof bKey === 'string') {
          if (aKey.toLowerCase() < bKey.toLowerCase()) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aKey.toLowerCase() > bKey.toLowerCase()) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }

        return 0;
      });
    }

    return sortableServicos;
  }, [servicos, sortConfig]);

  // Função para filtrar os serviços
  const filteredServicos = useMemo(() => {
    return sortedServicos.filter(servico => {
      const matchesSearch = servico.veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servico.descricao.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'Todos' || servico.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [sortedServicos, searchTerm, statusFilter]);

  // Função para lidar com a ordenação
  const requestSort = (key: keyof Servico) => {
    let direction: 'ascending' | 'descending' = 'ascending';

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  // Paginação
  const pageCount = Math.ceil(filteredServicos.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredServicos.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Ações por Linha
  const handleView = (servico: Servico) => {
    toast.info(`Visualizando serviço: ${servico.descricao}`);
    // Implemente a lógica para visualizar detalhes
  };

  const handleEdit = (servico: Servico) => {
    toast.info(`Editando serviço: ${servico.descricao}`);
    // Implemente a lógica para editar serviço
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      const updatedServicos = servicos.filter(servico => servico.id !== id);
      setServicos(updatedServicos);
      toast.success('Serviço excluído com sucesso!');
    }
  };

  // Função para enviar a solicitação de ajuda
  const handleHelpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Aqui você pode integrar com uma API ou serviço de backend para processar a solicitação de ajuda.
    // Para este exemplo, vamos apenas exibir uma notificação de sucesso e fechar o modal.
    
    toast.success('Solicitação de ajuda enviada com sucesso!');
    
    // Resetar os campos do formulário
    setHelpName('');
    setHelpEmail('');
    setHelpDescription('');
    
    // Fechar o modal
    setIsHelpModalOpen(false);
  };

  return (
    <>
      <Cabecalho />
      <MainContainer>
        <Title>Histórico de Serviços</Title>
        <SearchFilterContainer>
          <SearchInput
            type="text"
            placeholder="Buscar por veículo ou serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <StatusFilter
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Todos">Todos os Status</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
            <option value="Em andamento">Em andamento</option>
          </StatusFilter>
        </SearchFilterContainer>
        <TableContainer>
          <StyledTable>
            <StyledThead>
              <tr>
                <StyledTh
                  isSorted={sortConfig?.key === 'descricao' || false}
                  sortDirection={sortConfig?.key === 'descricao' ? sortConfig.direction : ''}
                  onClick={() => requestSort('descricao')}
                >
                  Serviço Realizado
                  {sortConfig?.key === 'descricao' ? (
                    sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                  ) : (
                    <FaSort />
                  )}
                </StyledTh>
                <StyledTh
                  isSorted={sortConfig?.key === 'status' || false}
                  sortDirection={sortConfig?.key === 'status' ? sortConfig.direction : ''}
                  onClick={() => requestSort('status')}
                >
                  Status do Pedido
                  {sortConfig?.key === 'status' ? (
                    sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                  ) : (
                    <FaSort />
                  )}
                </StyledTh>
                <StyledTh
                  isSorted={sortConfig?.key === 'veiculo' || false}
                  sortDirection={sortConfig?.key === 'veiculo' ? sortConfig.direction : ''}
                  onClick={() => requestSort('veiculo')}
                >
                  Veículo
                  {sortConfig?.key === 'veiculo' ? (
                    sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                  ) : (
                    <FaSort />
                  )}
                </StyledTh>
                <StyledTh
                  isSorted={sortConfig?.key === 'data' || false}
                  sortDirection={sortConfig?.key === 'data' ? sortConfig.direction : ''}
                  onClick={() => requestSort('data')}
                >
                  Data do Serviço
                  {sortConfig?.key === 'data' ? (
                    sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                  ) : (
                    <FaSort />
                  )}
                </StyledTh>
                <StyledTh>
                  Ações
                </StyledTh>
              </tr>
            </StyledThead>
            <StyledTbody>
              {currentPageData.length === 0 ? (
                <StyledTr isEven={false}>
                  <StyledTd colSpan={5} style={{ textAlign: 'center' }}>
                    Nenhum serviço encontrado.
                  </StyledTd>
                </StyledTr>
              ) : (
                currentPageData.map((servico, index) => (
                  <StyledTr key={servico.id} isEven={index % 2 === 0}>
                    <StyledTd>{servico.descricao}</StyledTd>
                    <StyledTd>
                      <StatusBadge status={servico.status}>{servico.status}</StatusBadge>
                    </StyledTd>
                    <StyledTd>{servico.veiculo}</StyledTd>
                    <StyledTd>{servico.data}</StyledTd>
                    <StyledTd>
                      <ActionButtons>
                        <IconButton onClick={() => handleView(servico)} title="Visualizar">
                          <FaEye />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(servico)} title="Editar">
                          <FaEdit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(servico.id)} title="Excluir">
                          <FaTrash />
                        </IconButton>
                      </ActionButtons>
                    </StyledTd>
                  </StyledTr>
                ))
              )}
            </StyledTbody>
          </StyledTable>
        </TableContainer>
        {/* Paginação */}
        {pageCount > 1 && (
          <PaginationContainer>
            <ReactPaginate
              previousLabel={'Anterior'}
              nextLabel={'Próximo'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'selected'}
              previousClassName={'page'}
              nextClassName={'page'}
              disabledClassName={'disabled'}
              pageClassName={'page'}
            />
          </PaginationContainer>
        )}
      </MainContainer>
      
      {/* Modal de Ajuda */}
      <ModalOverlay isVisible={isHelpModalOpen}>
        <ModalContent>
          <CloseButton onClick={() => setIsHelpModalOpen(false)}>&times;</CloseButton>
          <h2>Precisa de Ajuda?</h2>
          <form onSubmit={handleHelpSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                value={helpName}
                onChange={(e) => setHelpName(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                value={helpEmail}
                onChange={(e) => setHelpEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="description">Descrição do Problema:</label>
              <textarea
                id="description"
                value={helpDescription}
                onChange={(e) => setHelpDescription(e.target.value)}
                required
                rows={4}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#007bff',
                color: '#ffffff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Enviar Solicitação
            </button>
          </form>
        </ModalContent>
      </ModalOverlay>
      
      {/* Botão de Ajuda */}
      <HelpButton onClick={() => setIsHelpModalOpen(true)} title="Ajuda">
        &#x2753; {/* Símbolo de interrogação */}
      </HelpButton>
      
      {/* Notificações */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default HistoricoServicos;
