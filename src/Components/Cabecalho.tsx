import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  width: 100%;
  background-color: #333; 
`;

const ContainerFluid = styled.div`
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
`;

const HeaderInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: center; 
  flex: 1;
`;

const MenuLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled.div`
  position: relative;
  margin: 0 20px; 
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover .tooltip,
  &:focus .tooltip {
    display: block;
  }
`;

const NavIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: 35px; /* Ajuste para a posição da tooltip */
  left: 50%;
  transform: translateX(-50%);
  color: black;
  padding: 5px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 1;
`;

const Profile = styled.a`
  margin: 0 20px;

  img {
    border-radius: 50%;
    border: 2px solid white;
    width: 50px;
  }
`;

const SairButton = styled.input`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
`;

const Cabecalho: React.FC = () => {
  return (
    <Header>
      <ContainerFluid>
        <Navbar>
          <HeaderInner>
            <a className="navbar-brand flex-shrink-0" href="#">
              <img src="/imagens/carchek sem fundo.png" alt="logo-image" className="img-fluid" width="200px" />
            </a>
            <HeaderContent>
              <MenuLinks>
                <NavItem>
                  <Link to="/">
                    <NavIcon src="/imagens/home.png" alt="Inicio Icon" />
                  </Link>
                  <Tooltip>Inicio</Tooltip>
                </NavItem>
                <NavItem>
                  <Link to="/servicos">
                    <NavIcon src="/imagens/batepapo.png" alt="Servicos Icon" />
                  </Link>
                  <Tooltip>Servicos em andamento</Tooltip>
                </NavItem>
                <NavItem>
                  <Link to="/historico">
                    <NavIcon src="/imagens/batepapo2.png" alt="Historico Icon" />
                  </Link>
                  <Tooltip>Historico de Serviços</Tooltip>
                </NavItem>
                <NavItem>
                  <Link to="/novoveiculo">
                    <NavIcon src="/imagens/sedan.png" alt="Novo Veiculo Icon" />
                  </Link>
                  <Tooltip>Novo Veiculo</Tooltip>
                </NavItem>
                <NavItem>
                  <Link to="/veiculossalvos">
                    <NavIcon src="/imagens/carro.png" alt="Veiculos Salvos Icon" />
                  </Link>
                  <Tooltip>Veiculos Salvos</Tooltip>
                </NavItem>
              </MenuLinks>

              <div className="sair">
                <SairButton
                  type="button"
                  value="Sair/trocar"
                  onClick={() => (window.location.href = '/login')}
                />
              </div>
            </HeaderContent>
          </HeaderInner>
        </Navbar>
      </ContainerFluid>
    </Header>
  );
};

export default Cabecalho;
