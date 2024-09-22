import React from 'react';
import '../assets/Siderbar.css'; 
import '../assets/global.css';

const Cabecalho: React.FC = () => {
  return (
    <header>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="header-inner d-flex justify-content-between align-items-center">
            <a className="navbar-brand flex-shrink-0" href="#">
              <img src="/imagens/carchek sem fundo.png" alt="logo-image" className="img-fluid" width="200px" />
            </a>
            <div className="header-content d-flex align-items-center justify-content-end">
              <form className="d-flex justify-content-end align-items-center">
                <div className="search-icon">
                  <i className="fa fa-search" aria-hidden="true"></i>
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Pesquisar"
                    aria-label="Search"
                  />
                </div>
              </form>
              <a href="#" className="profile">
                <img src="/imagens/avatar.png" alt="user-image" />
              </a>
              <div className="sair">
                <input
                  type="button"
                  value="Sair/trocar"
                  onClick={() => (window.location.href = '/login')}
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Cabecalho;

