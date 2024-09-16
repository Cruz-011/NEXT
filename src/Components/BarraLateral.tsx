import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Header.css'; 

const BarraLateral: React.FC = () => {
  return (
    <div className="menu-links left">
      <ul>
        <li className="nav-item active">
          <Link to="/" className="d-flex align-items-center nav-link">
            <img src="/imagens/home.png" alt="Inicio Icon" className="nav-icon" />
            <span>Inicio</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/servicos" className="d-flex align-items-center nav-link">
            <img src="/imagens/batepapo.png" alt="Servicos Icon" className="nav-icon" />
            <span>Servicos em andamento</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/historico" className="d-flex align-items-center nav-link">
            <img src="/imagens/batepapo2.png" alt="Historico Icon" className="nav-icon" />
            <span>Historico de Serviços</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/novoveiculo" className="d-flex align-items-center nav-link">
            <img src="/imagens/sedan.png" alt="Novo Veiculo Icon" className="nav-icon" />
            <span>Novo Veiculo</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/veiculossalvos" className="d-flex align-items-center nav-link">
            <img src="/imagens/carro.png" alt="Veiculos Salvos Icon" className="nav-icon" />
            <span>Veiculos Salvos</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BarraLateral;

