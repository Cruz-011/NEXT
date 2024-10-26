import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Header = styled.header`
  width: 100%;
  background-color: #1a1a1d;
  border-bottom: 2px solid #007bff; /* Alterado para azul */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  top: 0;
  z-index: 999;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1850px; /* Limita a largura máxima */
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Logo à esquerda, menu ao centro e botão à direita */
  padding: 10px 20px;

  @media (max-width: 768px) {
    flex-direction: column; /* Alinha os itens em coluna em telas menores */
    align-items: center; /* Centraliza os itens */
    padding-top: 20px; /* Adiciona mais espaço no topo */
  }
`;

const Logo = styled.img`
  width: 180px; /* Ajuste do tamanho do logo */
  height: auto;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 150px;
  }
`;

const Menu = styled.nav`
  display: flex;
  justify-content: center; /* Centraliza o menu */
  flex-wrap: wrap; /* Permite que os itens quebrem em várias linhas em telas pequenas */
`;

const NavItem = styled.div`
  margin: 0 10px; /* Reduz a distância entre os ícones */
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1); /* Efeito de zoom ao passar o mouse */
  }

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const NavIcon = styled.img`
  width: 40px; /* Tamanho maior do ícone */
  height: 40px;
  filter: brightness(0.9);

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
     margin-top: 20px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    margin-top: 20px;
  }
`;

const NavText = styled.span`
  color: #f1f1f1;
  font-size: 12px; /* Tamanho do texto reduzido */
  margin-top: 8px;
  text-align: center;
  text-transform: uppercase; /* Estilo futurista */
  letter-spacing: 1px; /* Espaçamento entre letras */

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

// Novo Styled Components para Configuração
const ConfigContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  margin: 0 10px; /* Reduz a distância entre o item anterior */
  
  @media (max-width: 768px) {
    margin-top: 20px; /* Adiciona mais espaço no topo em telas menores */
  }
`;

const ConfigIcon = styled.img`
  width: 40px;
  height: 40px;
  filter: brightness(0.9);

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

const ConfigText = styled.span`
  color: #f1f1f1;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px; /* Ajuste conforme necessário */
  right: 0;
  background-color: rgba(26, 26, 29, 0.95); /* Fundo semi-transparente */
  border: 1px solid #007bff; /* Alterado para azul */
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  z-index: 1000;
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  color: #f1f1f1;
  padding: 10px 20px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #007bff; /* Alterado para azul */
    color: #fff;
  }

  &:focus {
    outline: none;
    background-color: #007bff; /* Alterado para azul */
    color: #fff;
  }
`;

// Componente Cabecalho
const Cabecalho: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState<string>('Usuário'); // Estado para o nome do usuário
  const navigate = useNavigate();
  const configRef = useRef<HTMLDivElement>(null);

  // Função para alternar o dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Função para mudar o nome do usuário
  const handleChangeName = () => {
    const newName = prompt('Digite seu novo nome:', userName);
    if (newName) {
      setUserName(newName);
    }
  };

  // Função para sair e redirecionar para a página de login
  const handleLogout = () => {
    // Aqui você pode adicionar lógica para limpar dados do usuário se necessário
    navigate('/login'); // Redireciona para a página de login
  };

  const handlemecanico = () => {
    navigate('/Mecanico');
  };

  // Fechar o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (configRef.current && !configRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <Header>
      <Container>
        <Link to="/">
          <Logo src="/imagens/carchecknovo.png" alt="Logo" />
        </Link>

        {/* Menu de Navegação */}
        <Menu>
          <NavItem>
            <Link to="/">
              <NavIcon src="/imagens/botao-de-inicio.png" alt="Início" />
              <NavText>Início</NavText>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/servicos">
              <NavIcon src="/imagens/servico-tecnico.png" alt="Serviços" />
              <NavText>Serviços</NavText>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/historico">
              <NavIcon src="/imagens/historico-de-pedidos.png" alt="Histórico" />
              <NavText>Histórico</NavText>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/AgendamentosRealizados">
              <NavIcon src="/imagens/agenda.png" alt="Agendamentos" />
              <NavText>Agendamentos</NavText>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/veiculossalvos">
              <NavIcon src="/imagens/carro.png" alt="Veículos Salvos" />
              <NavText>Veículos Salvos</NavText>
            </Link>
          </NavItem>
          {/* Item Agendamentos adicionado aqui */}
          <NavItem>
          <Link to="/novoveiculo">
              <NavIcon src="/imagens/engarrafamento.png" alt="Novo Veículo" />
              <NavText>Novo Veículo</NavText>
            </Link>
          </NavItem>
        </Menu>

        {/* Ícone de Configuração */}
        <ConfigContainer ref={configRef} onClick={toggleDropdown}>
          <ConfigIcon src="/imagens/configuracoes.png" alt="Configuração" />
          <ConfigText>Configurações</ConfigText>
          {isDropdownOpen && (
            <DropdownMenu>
              <DropdownItem onClick={handleChangeName}>Alterar nome</DropdownItem>
              <DropdownItem onClick={handlemecanico}>Mecânico</DropdownItem>
              <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
            </DropdownMenu>
          )}
        </ConfigContainer>
      </Container>
    </Header>
  );
};

export default Cabecalho;
