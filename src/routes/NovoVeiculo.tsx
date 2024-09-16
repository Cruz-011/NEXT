import React, { useState } from 'react';
import Cabecalho from '../Components/Cabecalho';
import '../assets/novo.css';

const NovoVeiculo: React.FC = () => {
  const [veiculoSalvo, setVeiculoSalvo] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const vehicleData = Object.fromEntries(formData.entries());

    let vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    vehicles.push(vehicleData);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));

    setVeiculoSalvo(true);
  };

  return (
    <div>
      <Cabecalho />

      <div className="form-container">
        <h2>Cadastro de Veículo</h2>
        
        {veiculoSalvo ? (
          <div id="message">
            <p>Veículo salvo com sucesso!</p>
            <button onClick={() => window.location.href = '/veiculossalvos'}>
              Ver Veículos Salvos
            </button>
          </div>
        ) : (
          <form id="vehicle-form" onSubmit={handleSubmit}>
            <label htmlFor="marca">Marca:</label>
            <input type="text" id="marca" name="marca" required />
            
            <label htmlFor="modelo">Modelo:</label>
            <input type="text" id="modelo" name="modelo" required />
            
            <label htmlFor="ano">Ano:</label>
            <input type="number" id="ano" name="ano" required />
            
            <label htmlFor="combustivel">Combustível:</label>
            <select id="combustivel" name="combustivel" required>
              <option value="alcool">Álcool</option>
              <option value="gasolina">Gasolina</option>
              <option value="diesel">Diesel</option>
              <option value="hibrido">Híbrido</option>
              <option value="eletrico">100% Elétrico</option>
            </select>
            
            <label htmlFor="placa">Placa:</label>
            <input type="text" id="placa" name="placa" required />
            
            <label htmlFor="chassis">Chassis:</label>
            <input type="text" id="chassis" name="chassis" required />
            
            <button type="submit">Salvar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NovoVeiculo;
