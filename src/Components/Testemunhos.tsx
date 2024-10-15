import React, { useRef } from 'react';
import styles from '../assets/Testemunhos.module.css';

const Testemunhos: React.FC = () => {
  const depoimentos = [
    {
      nome: 'João Silva',
      texto: 'A Car Check facilitou muito a manutenção do meu carro. Super recomendo!',
    },
    {
      nome: 'Maria Oliveira',
      texto: 'Serviço rápido e preços acessíveis. Estou muito satisfeita.',
    },
    {
      nome: 'Carlos Pereira',
      texto: 'A interface é intuitiva e o atendimento via chat é excelente.',
    },
    {
      nome: 'Ana Paula',
      texto: 'Ótimo serviço! Meu carro nunca esteve tão bem cuidado.',
    },
    {
      nome: 'Felipe Santos',
      texto: 'Profissionalismo e eficiência. Voltarei sempre que precisar.',
    },
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300, // Ajuste a quantidade conforme necessário
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300, // Ajuste a quantidade conforme necessário
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.testemunhosSection}>
      <h2>O que nossos clientes dizem</h2>
      <div className={styles.carouselContainer}>
        <button className={styles.navButton} onClick={scrollLeft} aria-label="Rolagem para a esquerda">
          &#10094;
        </button>
        <div className={styles.carousel} ref={carouselRef}>
          {depoimentos.map((depoimento, index) => (
            <div key={index} className={styles.depoimentoCard}>
              <p>"{depoimento.texto}"</p>
              <h4>- {depoimento.nome}</h4>
            </div>
          ))}
        </div>
        <button className={styles.navButton} onClick={scrollRight} aria-label="Rolagem para a direita">
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Testemunhos;
