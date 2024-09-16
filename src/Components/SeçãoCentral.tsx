import React from 'react';
import '../assets/global.css';
import '../assets/Home.css';

const SeçãoCentral: React.FC = () => {
  return (
    <div className="content">
      <div className="section-container">
        <section className="section">
          <div className="card">
            <div className="texto_card">
              <h2>Car Check</h2>
              <h3 className="section-heading">Sua solução a um clique de distância.</h3>
              <p>
                Seu diagnóstico e um orçamento em minutos, na sua mão, sem sair de casa.
              </p>
            </div>
            <div className="utilizacao-image">
              <img
                className="img_celular"src="/imagens/celular.png"
              />
            </div>
          </div>
        </section>

        <div className="container">
          <section className="tempo">
            <img src="/imagens/tempo.png" alt="Ícone de tempo" />
            <h1>ECONOMIA DE TEMPO</h1>
            <p>Seu diagnóstico e seu orçamento em minutos.</p>
          </section>
          <section className="preco">
            <img src="/imagens/money.png" alt="Ícone de dinheiro" />
            <h1>MELHORES PREÇOS</h1>
            <p>
              Nosso sistema conta com a melhor inteligência artificial, capaz de buscar os
              menores preços do mercado.
            </p>
          </section>
          <section className="conforto">
            <img src="/imagens/cama.png" alt="Ícone de conforto" />
            <h1>CONFORTO</h1>
            <p>
              Nosso sistema permite que faça o autodiagnóstico sem a necessidade de deixar o
              veículo na oficina.
            </p>
          </section>
          <section className="acessibilidade">
            <img
              src="/imagens/acessibilidade.png"
              alt="Ícone de acessibilidade"
            />
            <h1>ACESSIBILIDADE</h1>
            <p>Nosso sistema é adaptado para todos os tipos de usuários.</p>
          </section>
          <section className="compatibilidade">
            <img src="/imagens/conexão.png" alt="Ícone de compatibilidade" />
            <h1>COMPATIBILIDADE</h1>
            <p>É possível identificar qualquer problema de qualquer veículo.</p>
          </section>
        </div>

        <section className="problemas">
          <h1>PROBLEMAS JÁ IDENTIFICADOS</h1>
          <div className="botoes-container">
            <button className="botao">Ar Condicionado</button>
            <button className="botao">Arrefecimento</button>
            <button className="botao">Balanceamento</button>
            <button className="botao">Freio</button>
            <button className="botao">Embreagens</button>
            <button className="botao">Correias</button>
            <button className="botao">Ignição</button>
          </div>
        </section>

        <section className="btp">
          <h1>NÃO SABE QUAL O PROBLEMA? NÓS TE AJUDAMOS.</h1>
          <div className="btn-container">
            <button className="botao-principal">CLIQUE AQUI</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SeçãoCentral;

