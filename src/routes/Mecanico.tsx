import React, { useState } from 'react';
import styles from '../assets/Mecanico.module.css';

interface Servico {
  nome: string;
  prazoConclusao: string;
}

const Mecanico: React.FC = () => {
  const [telefone1, setTelefone1] = useState('');
  const [telefone2, setTelefone2] = useState('');
  const [email, setEmail] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [cnpjOuCpf, setCnpjOuCpf] = useState('');
  const [servicosSolicitados, setServicosSolicitados] = useState<Servico[]>([
    { nome: 'Troca de Óleo', prazoConclusao: '2 dias' },
    { nome: 'Troca de Pneu', prazoConclusao: '1 dia' },
    { nome: 'Alinhamento', prazoConclusao: '3 horas' },
  ]);
  const [servicosRealizados, setServicosRealizados] = useState<any[]>([]);
  const [codigoCliente, setCodigoCliente] = useState('');
  
  const handleSubmitCadastro = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para cadastrar a mecânica
    console.log('Mecânica cadastrada:', { telefone1, telefone2, email, localizacao, cnpjOuCpf });
    // Resetar o formulário
    setTelefone1('');
    setTelefone2('');
    setEmail('');
    setLocalizacao('');
    setCnpjOuCpf('');
  };

  const handleAceitarServico = (servico: Servico) => {
    // Remover o serviço aceito da lista de solicitados
    setServicosSolicitados((prev) => prev.filter(s => s.nome !== servico.nome));
  };

  const handleConcluirServico = (servico: Servico) => {
    const dataConclusao = new Date();
    const novoServicoRealizado = {
      ...servico,
      codigoCliente,
      dataConclusao,
    };
    setServicosRealizados((prev) => [...prev, novoServicoRealizado]);
    // Remover o serviço concluído da lista de serviços solicitados
    setServicosSolicitados((prev) => prev.filter(s => s.nome !== servico.nome));
    // Resetar código do cliente
    setCodigoCliente('');
  };

  return (
    <div className={styles.mecanicoContainer}>
      <h1>Cadastro de Mecânica</h1>
      <form onSubmit={handleSubmitCadastro}>
        <input
          type="text"
          placeholder="Telefone 1"
          value={telefone1}
          onChange={(e) => setTelefone1(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Telefone 2"
          value={telefone2}
          onChange={(e) => setTelefone2(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Localização"
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CNPJ/CPF do Dono"
          value={cnpjOuCpf}
          onChange={(e) => setCnpjOuCpf(e.target.value)}
          required
        />
        <button type="submit">Cadastrar Mecânica</button>
      </form>

      <h2>Serviços a Serem Solicitados</h2>
      <ul>
        {servicosSolicitados.map((servico, index) => (
          <li key={index}>
            {servico.nome} - {servico.prazoConclusao}
            <button onClick={() => handleAceitarServico(servico)}>Aceitar Serviço</button>
          </li>
        ))}
      </ul>

      <h2>Serviços em Andamento</h2>
      <ul>
        {servicosRealizados.map((servico, index) => (
          <li key={index}>
            {servico.nome} - Concluído em: {servico.dataConclusao.toLocaleDateString()}
            <p>Código do Cliente: {servico.codigoCliente}</p>
          </li>
        ))}
      </ul>

      <h2>Concluir Serviço</h2>
      <input
        type="text"
        placeholder="Código do Cliente"
        value={codigoCliente}
        onChange={(e) => setCodigoCliente(e.target.value)}
      />
      <button onClick={() => {
        const servico = servicosRealizados[servicosRealizados.length - 1]; // Assume que você quer concluir o último serviço
        if (servico) {
          handleConcluirServico(servico);
        }
      }}>Concluir Último Serviço</button>
    </div>
  );
};

export default Mecanico;
