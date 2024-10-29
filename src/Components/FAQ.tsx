import React, { useState } from 'react';
import styles from '../assets/FAQ.module.css';

const FAQ: React.FC = () => {
  const perguntas = [
    {
      pergunta: 'Como funciona o diagnóstico do carro?',
      resposta:
        'Utilizamos inteligência artificial para analisar os sintomas apresentados e fornecer um diagnóstico preciso em minutos.',
    },
    {
      pergunta: 'Quais veículos são compatíveis com o sistema?',
      resposta: 'Nosso sistema é compatível com a maioria dos veículos do mercado, independentemente da marca ou modelo.',
    },
    {
      pergunta: 'Como obter o orçamento?',
      resposta:
        'Após o diagnóstico, você receberá um orçamento detalhado diretamente em seu aplicativo ou via chat.',
    },
    {
      pergunta: 'Sobre o Projeto',
      resposta:
        'Este projeto está na versão 1.0. Ainda há muitas implementações que queremos trazer ao site, criando uma plataforma mais interativa e com maior facilidade e precisão para oferecer um orçamento mais detalhado.',
    },
    {
      pergunta: 'O que pretendemos alcancar com esse projeto ',
      resposta:
        ' Queremos proporcionar ao usuário da nossa plataforma uma experiência que realmente faça a diferença em sua vida automotiva, oferecendo mais facilidade, praticidade e precisão para quem a utilizar.',
    },
  ];

  const [ativo, setAtivo] = useState<number | null>(null);

  const toggleAtivo = (index: number) => {
    if (ativo === index) {
      setAtivo(null);
    } else {
      setAtivo(index);
    }
  };

  return (
    <div className={styles.faqSection}>
      <h2>Perguntas Frequentes</h2>
      <div className={styles.accordion}>
        {perguntas.map((item, index) => (
          <div key={index} className={styles.accordionItem}>
            <button className={styles.accordionButton} onClick={() => toggleAtivo(index)}>
              {item.pergunta}
              <span>{ativo === index ? '-' : '+'}</span>
            </button>
            {ativo === index && <div className={styles.accordionContent}>{item.resposta}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
