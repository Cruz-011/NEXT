import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/LoginCadastro.module.css'; // Importa o CSS Module

function LoginCadastro() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Função para salvar dados de usuário no localStorage
  const saveUser = (username: string, email: string, password: string) => {
    const userData = { username, email, password };
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Função para verificar o login
  const verifyLogin = (email: string, password: string) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      return userData.email === email && userData.password === password;
    }
    return false;
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isRegistering) {
      if (password !== confirmPassword) {
        alert('As senhas não coincidem');
        return;
      }

      // Salva as informações no localStorage
      saveUser(username, email, password);
      alert('Registro realizado com sucesso!');
      setIsRegistering(false);
    } else {
      // Verifica se o login é válido
      if (verifyLogin(email, password)) {
        alert('Login realizado com sucesso!');
        navigate('/');
      } else {
        alert('E-mail ou senha inválidos');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src="public/imagens/carchek sem fundo.png" alt="Carcheck login" className={styles.imgLoginCk}/>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.loginContainer}>
          <h2>{isRegistering ? 'Registrar' : 'Entrar'}</h2>
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
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
              <div className={styles.formGroup}>
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

            <button type="submit" className={styles.buttonLogin}>
              {isRegistering ? 'Registrar' : 'Entrar'}
            </button>
          </form>

          <p>
            {isRegistering ? (
              <>
                Já tem uma conta?{' '}
                <button className={styles.toggleButton} onClick={() => setIsRegistering(false)}>
                  Entrar
                </button>
              </>
            ) : (
              <>
                Não tem uma conta?{' '}
                <button className={styles.toggleButton} onClick={() => setIsRegistering(true)}>
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
