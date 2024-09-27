import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: transparent; 
  color: white;
  text-align: center;
  padding: 20px;
  width: 100%;
  position: relative; 
  bottom: 0; 
  margin-left: 0px; 
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
    <FooterContainer>
      <p>&copy; 2024 CarCheck - Todos os direitos reservados</p>
      <SupportContainer>
        <p>Apoio Porto Seguro</p>
        <PortoSeguroLogo src="./public/imagens/porto.png"  />
      </SupportContainer>
    </FooterContainer>
  );
}

export default Rodape;
