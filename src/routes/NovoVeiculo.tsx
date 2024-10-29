import React, { useState } from 'react';
import Cabecalho from '../Components/Cabecalho'; 
import styles from '../assets/NovoVeiculo.module.css';

const NovoVeiculo: React.FC = () => {
  const [veiculoSalvo, setVeiculoSalvo] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const vehicleData = Object.fromEntries(formData.entries());

    // Salva os dados do veículo no localStorage
    let vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    vehicles.push(vehicleData);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));

    setVeiculoSalvo(true);
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <div className={styles.formContainer}>
        <h2>Cadastro de Veículo</h2>

        {veiculoSalvo ? (
          <div className={styles.message}>
            <p>Veículo salvo com sucesso!</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="marca">Marca:</label>
              <input className={styles.input} type="text" id="marca" name="marca" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="modelo">Modelo:</label>
              <input className={styles.input} type="text" id="modelo" name="modelo" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="ano">Ano:</label>
              <input className={styles.input} type="number" id="ano" name="ano" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="combustivel">Combustível:</label>
              <select className={styles.select} id="combustivel" name="combustivel" required>
                <option value="alcool">Álcool</option>
                <option value="gasolina">Gasolina</option>
                <option value="diesel">Diesel</option>
                <option value="hibrido">Híbrido</option>
                <option value="eletrico">100% Elétrico</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="placa">Placa:</label>
              <input className={styles.input} type="text" id="placa" name="placa" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="chassis">Chassis:</label>
              <input className={styles.input} type="text" id="chassis" name="chassis" required />
            </div>

            <button className={styles.button} type="submit">Salvar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NovoVeiculo;
