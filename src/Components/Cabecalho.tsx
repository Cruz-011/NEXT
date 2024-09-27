import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  width: 100%;
`;

const ContainerFluid = styled.div`
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
`;

const Navbar = styled.nav`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 100%;
  flex: 1; 
`;

const SearchIcon = styled.div`
  flex: 1; 
  display: flex;
  align-items: center; 
`;

const SearchInput = styled.input`
  color: black;
  height: 35px; /* Ajustado para ficar mais fino */
  padding: 5px 10px; /* Ajustado para um padding menor */
  border-radius: 50px;
  border: none;
  width: 100%; 
  &::placeholder {
    color: black;
  }
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
        <Navbar className="navbar navbar-expand-lg navbar-light">
          <HeaderInner>
            <a className="navbar-brand flex-shrink-0" href="#">
              <img src="/imagens/carchek sem fundo.png" alt="logo-image" className="img-fluid" width="200px" />
            </a>
            <HeaderContent>
              <form className="d-flex" style={{ width: '100%' }}> 
                <SearchIcon>
                  <i className="fa fa-search" aria-hidden="true"></i>
                  <SearchInput
                    type="search"
                    placeholder="Pesquisar"
                    aria-label="Search"
                  />
                </SearchIcon>
              </form>
              <Profile href="#">
                <img src="/imagens/avatar.png" alt="user-image" />
              </Profile>
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
