import React, { useEffect, useState } from 'react';
import '../Components/Cabecalho';
import styles from '../assets/VeiculosSalvos.module.css'; 
import Cabecalho from '../Components/Cabecalho';

interface Vehicle {
  marca: string;
  modelo: string;
  ano: string;
  combustivel: string;
  placa: string;
  chassis: string;
}

const VeiculosSalvos: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const savedVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    setVehicles(savedVehicles);
  }, []);

  return (
    <div>
      <Cabecalho />

      <div className={styles.vehiclesContainer}>
        <h2>Veículos Salvos</h2>
        {vehicles.length === 0 ? (
          <p>Nenhum veículo salvo.</p>
        ) : (
          <div className={styles.vehicleCardsContainer}> {/* Novo contêiner para os cartões */}
            {vehicles.map((vehicle, index) => (
              <div key={index} className={styles.vehicleCard}>
                <h3>{vehicle.marca} {vehicle.modelo}</h3>
                <div className={styles.vehicleInfo}>
                  <p><strong>Ano:</strong> {vehicle.ano}</p>
                  <p><strong>Combustível:</strong> {vehicle.combustivel}</p>
                  <p><strong>Placa:</strong> {vehicle.placa}</p>
                  <p><strong>Chassis:</strong> {vehicle.chassis}</p>
                </div>
                <div className={styles.cardActions}>
                  <button className={styles.btnAjuda}>Ajuda</button>
                  <button className={styles.btnEditar}>Editar</button>
                  <button className={styles.btnExcluir}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VeiculosSalvos;
