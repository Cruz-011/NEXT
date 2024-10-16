import React, { useEffect, useState } from 'react';
import '../Components/Cabecalho';
import styles from '../assets/VeiculosSalvos.module.css'; 
import Cabecalho from '../Components/Cabecalho';
import Chat from '../Components/Chat'; 

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
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Adicione este estado

  useEffect(() => {
    const savedVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    setVehicles(savedVehicles);
  }, []);

  const handleEdit = (index: number) => {
    const vehicle = vehicles[index];
    setVehicleToEdit(vehicle);
    setEditIndex(index); // Armazene o índice do veículo a ser editado
    setShowModal(true);
  };

  const handleSave = () => {
    if (vehicleToEdit && editIndex !== null) {
      const updatedVehicles = [...vehicles]; // Crie uma cópia da lista original
      updatedVehicles[editIndex] = vehicleToEdit; // Atualize apenas o veículo específico
      setVehicles(updatedVehicles);
      localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
      setShowModal(false);
      setVehicleToEdit(null);
      setEditIndex(null); // Limpe o índice após a edição
    }
  };

  const handleHelp = (vehicle: Vehicle) => {
    const message = `Preciso de ajuda para o veículo ${vehicle.marca} ${vehicle.modelo}. Qual é o problema?`;
    setChatMessage(message);
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setChatMessage('');
  };

  const handleDelete = (index: number) => {
    const updatedVehicles = vehicles.filter((_, i) => i !== index); // Lógica para excluir veículo
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles)); // Atualiza o localStorage
  };

  return (
    <div>
      <Cabecalho />

      <div className={styles.vehiclesContainer}>
        <h2>Veículos Salvos</h2>
        {vehicles.length === 0 ? (
          <p>Nenhum veículo salvo.</p>
        ) : (
          <div className={styles.vehicleCardsContainer}>
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
                  <button className={styles.btnAjuda} onClick={() => handleHelp(vehicle)}>Ajuda</button>
                  <button className={styles.btnEditar} onClick={() => handleEdit(index)}>Editar</button>
                  <button className={styles.btnExcluir} onClick={() => handleDelete(index)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && vehicleToEdit && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Editar Veículo</h3>
            <input
              type="text"
              value={vehicleToEdit.marca}
              onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, marca: e.target.value })}
              placeholder="Marca"
            />
            <input
              type="text"
              value={vehicleToEdit.modelo}
              onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, modelo: e.target.value })}
              placeholder="Modelo"
            />
            <input
              type="text"
              value={vehicleToEdit.ano}
              onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, ano: e.target.value })}
              placeholder="Ano"
            />
            <input
              type="text"
              value={vehicleToEdit.combustivel}
              onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, combustivel: e.target.value })}
              placeholder="Combustível"
            />
            <input
              type="text"
              value={vehicleToEdit.placa}
              onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, placa: e.target.value })}
              placeholder="Placa"
            />
            <input
              type="text"
              value={vehicleToEdit.chassis}
              onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, chassis: e.target.value })}
              placeholder="Chassis"
            />
            <div className={styles.modalActions}>
              <button className={styles.btnSalvar} onClick={handleSave}>Salvar</button>
              <button className={styles.btnFechar} onClick={() => setShowModal(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {showChat && (
        <Chat onClose={handleCloseChat} />
      )}
    </div>
  );
};

export default VeiculosSalvos;
