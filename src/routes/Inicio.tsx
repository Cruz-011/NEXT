import React from 'react';
import WatsonAssistant from '../Components/WatsonAssistant';
import Cabecalho from '../Components/Cabecalho';
import BarraLateral from '../Components/BarraLateral';
import Rodape from '../Components/Rodape';
import styles from '../assets/Inicio.module.css';

const Inicio: React.FC = () => {
  return (
    <>
      <Cabecalho />
      <BarraLateral />

      <div className={styles.content}>
        <div className={styles.sectionContainer}>
          <section className={styles.section}>
            <div className={styles.card}>
              <div className={styles.texto_card}>
                <h2>Car Check</h2>
                <h3 className={styles.sectionHeading}>Sua solução a um clique de distância.</h3>
                <p>
                  Seu diagnóstico e um orçamento em minutos, na sua mão, sem sair de casa.
                </p>
              </div>
              <div className={styles.utilizacaoImage}>
                <img className={styles.imgCelular} src="/imagens/celular.png" alt="Celular" />
              </div>
            </div>
          </section>

          <div className={styles.container}>
            <section className={styles.tempo}>
              <img src="/imagens/tempo.png" alt="Ícone de tempo" />
              <h1>ECONOMIA DE TEMPO</h1>
              <p>Seu diagnóstico e seu orçamento em minutos.</p>
            </section>
            <section className={styles.preco}>
              <img src="/imagens/money.png" alt="Ícone de dinheiro" />
              <h1>MELHORES PREÇOS</h1>
              <p>
                Nosso sistema conta com a melhor inteligência artificial, capaz de buscar os
                menores preços do mercado.
              </p>
            </section>
            <section className={styles.conforto}>
              <img src="/imagens/cama.png" alt="Ícone de conforto" />
              <h1>CONFORTO</h1>
              <p>
                Nosso sistema permite que faça o autodiagnóstico sem a necessidade de deixar o
                veículo na oficina.
              </p>
            </section>
            <section className={styles.acessibilidade}>
              <img
                src="/imagens/acessibilidade.png"
                alt="Ícone de acessibilidade"
              />
              <h1>ACESSIBILIDADE</h1>
              <p>Nosso sistema é adaptado para todos os tipos de usuários.</p>
            </section>
            <section className={styles.compatibilidade}>
              <img src="/imagens/conexão.png" alt="Ícone de compatibilidade" />
              <h1>COMPATIBILIDADE</h1>
              <p>É possível identificar qualquer problema de qualquer veículo.</p>
            </section>
          </div>

          <div className={styles.btp}>
            <h1>NÃO SABE QUAL É O PROBLEMA E PRECISA DE UM ORÇAMENTO ?<br/><br/>NÓS TE AJUDAMOS.</h1>
            <button className={styles.button}>INICIAR CHAT</button>
          </div>
        </div>
      </div>

      <WatsonAssistant />
      <Rodape />
    </>
  );
};

export default Inicio;
