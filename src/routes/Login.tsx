import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/LoginCadastro.css';

function LoginCadastro() {
  const [isRegistering, setIsRegistering] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const navigate = useNavigate();
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (isRegistering) {
      if (password !== confirmPassword) {
        alert('As senhas não coincidem');
        return;
      }
      alert('Registro realizado com sucesso!');
    } else {
      alert('Login realizado com sucesso!');
    }
    navigate('/');
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src="public\imagens\carchek sem fundo.png" alt="Carcheck login" className="img_login_ck"/>
      </div>
      <div className="right-side">
        <div className="login-container">
          <h2>{isRegistering ? 'Registrar' : 'Entrar'}</h2>
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <div className="form-group">
                <label htmlFor="username">Nome de Usuário</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isRegistering && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit">{isRegistering ? 'Registrar' : 'Entrar'}</button>
          </form>

          <p>
            {isRegistering ? (
              <>
                Já tem uma conta?{' '}
                <button onClick={() => setIsRegistering(false)} className="toggle-button">
                  Entrar
                </button>
              </>
            ) : (
              <>
                Não tem uma conta?{' '}
                <button onClick={() => setIsRegistering(true)} className="toggle-button">
                  Registrar
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginCadastro;
