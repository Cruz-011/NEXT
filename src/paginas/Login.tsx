import React, { useState } from 'react';
import '../assets/LoginCadastro.css';

const LoginCadastro: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [emailOuTelefone, setEmailOuTelefone] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ emailOuTelefone, senhaLogin });
  };

  const handleCadastroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ nome, email, telefone, senhaCadastro });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-cadastro-container">
      <div className="toggle-form">
        <button onClick={toggleForm}>
          {isLogin ? 'Ir para Cadastro' : 'Ir para Login'}
        </button>
      </div>

      {isLogin ? (
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="emailOuTelefone">Email ou Telefone:</label>
              <input
                type="text"
                id="emailOuTelefone"
                value={emailOuTelefone}
                onChange={(e) => setEmailOuTelefone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="senhaLogin">Senha:</label>
              <input
                type="password"
                id="senhaLogin"
                value={senhaLogin}
                onChange={(e) => setSenhaLogin(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="botao-submit">Entrar</button>
          </form>
        </div>
      ) : (
        <div className="cadastro-form">
          <h2>Cadastrar</h2>
          <form onSubmit={handleCadastroSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone:</label>
              <input
                type="tel"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="senhaCadastro">Criar Senha:</label>
              <input
                type="password"
                id="senhaCadastro"
                value={senhaCadastro}
                onChange={(e) => setSenhaCadastro(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="botao-submit">Cadastrar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginCadastro;
