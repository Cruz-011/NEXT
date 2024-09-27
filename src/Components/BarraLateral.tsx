import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../assets/global.css'

const MenuLinks = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  width: 250px;
  background-color: transparent;
  padding-top: 150px;
  display: flex;
  flex-direction: column;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 42px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  transition: all 0.5s;

  &:hover {
    color: var(--theme-color);
  }
`;

const NavIcon = styled.img`
  width: 25px; 
  height: 25px; 
  margin-right: 10px; 
`;

const BarraLateral: React.FC = () => {
  return (
    <MenuLinks>
      <List>
        <ListItem className="nav-item active">
          <NavLink to="/" className="d-flex align-items-center nav-link">
            <NavIcon src="/imagens/home.png" alt="Inicio Icon" />
            <span>Inicio</span>
          </NavLink>
        </ListItem>
        <ListItem className="nav-item">
          <NavLink to="/servicos" className="d-flex align-items-center nav-link">
            <NavIcon src="/imagens/batepapo.png" alt="Servicos Icon" />
            <span>Servicos em andamento</span>
          </NavLink>
        </ListItem>
        <ListItem className="nav-item">
          <NavLink to="/historico" className="d-flex align-items-center nav-link">
            <NavIcon src="/imagens/batepapo2.png" alt="Historico Icon" />
            <span>Historico de Serviços</span>
          </NavLink>
        </ListItem>
        <ListItem className="nav-item">
          <NavLink to="/novoveiculo" className="d-flex align-items-center nav-link">
            <NavIcon src="/imagens/sedan.png" alt="Novo Veiculo Icon" />
            <span>Novo Veiculo</span>
          </NavLink>
        </ListItem>
        <ListItem className="nav-item">
          <NavLink to="/veiculossalvos" className="d-flex align-items-center nav-link">
            <NavIcon src="/imagens/carro.png" alt="Veiculos Salvos Icon" />
            <span>Veiculos Salvos</span>
          </NavLink>
        </ListItem>
      </List>
    </MenuLinks>
  );
};

export default BarraLateral;
