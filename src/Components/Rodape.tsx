import React from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterContainer = styled.footer`
  background-color: transparent; 
  color: white;
  text-align: center;
  padding: 20px;
  width: 100%;
  position: relative; 
  margin-left: 0px; 
  margin-top: auto; /* Faz com que o rodapé fique no fim da página */
`;

const SupportContainer = styled.div`
  margin-top: -25px; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; 
`;

const PortoSeguroLogo = styled.img`
  width: 100px; 
  margin-top: -10px; 
`;

function Rodape() {
  return (
    <AppContainer>
      {/* Conteúdo da sua página aqui */}
      <FooterContainer>
        <p>&copy; 2024 CarCheck - Todos os direitos reservados</p>
        <SupportContainer><br /><br />
          <p>Apoio Porto Seguro</p>
          <br />
          <PortoSeguroLogo src="/imagens/porto.png" />
        </SupportContainer>
      </FooterContainer>
    </AppContainer>
  );
}

export default Rodape;
