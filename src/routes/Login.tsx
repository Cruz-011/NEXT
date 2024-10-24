import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/LoginCadastro.module.css'; // CSS atualizado

function LoginCadastro() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const saveUser = (username: string, email: string, password: string) => {
    const userData = { username, email, password };
    localStorage.setItem('user', JSON.stringify(userData));
  };

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

      saveUser(username, email, password);
      alert('Registro realizado com sucesso!');
      setIsRegistering(false);
    } else {
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
        <img src="/imagens/carchecknovo.png" alt="" className={styles.logo} />
        <h1 className={styles.slogan}>Seja Bem-vindo ao Futuro!</h1>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.loginContainer}>
          <h2>{isRegistering ? 'Crie sua Conta' : 'Login'}</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
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
                <label htmlFor="confirmPassword">Confirme a Senha</label>
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

          <p className={styles.toggleText}>
            {isRegistering ? (
              <>
                Já tem uma conta?{' '}
                <button className={styles.toggleButton} onClick={() => setIsRegistering(false)}>
                  Faça login
                </button>
              </>
            ) : (
              <>
                Não tem uma conta?{' '}
                <button className={styles.toggleButton} onClick={() => setIsRegistering(true)}>
                  Registre-se
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
