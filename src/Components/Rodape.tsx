import styled from 'styled-components';
import '../assets/Footer.css';

const FooterContainer = styled.footer`
  color: white;
  text-align: center;
  padding: 20px;
  width: 100%;
  bottom: 0;
  margin-left: 80px;
`;

function Rodape() {
  return (
    <FooterContainer>
      <p>&copy; 2024 CarCheck - Todos os direitos reservados</p>
    </FooterContainer>
  );
}

export default Rodape;
