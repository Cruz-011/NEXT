import React, { useState, useEffect, useRef } from 'react';
import styles from '../assets/Chat.module.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  options?: string[]; // Opções pré-definidas
}

const predefinedOptions = [
  'Suporte a Veículo Reparo',
  'Status do Pedido de Reparo',
  'Já sei qual o problema',
  'Agendar Visita',
  'Falar com um Atendente',
];

const Chat: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Impede a rolagem da página de fundo
    document.body.style.overflow = 'hidden';

    // Mensagem de boas-vindas com opções pré-definidas
    const welcomeMessage: Message = {
      text: 'Bem-Vindo ao ChatBot da CarCheck!',
      sender: 'bot',
      options: [
        'Estou tendo problemas técnicos com o meu veículo',
        'Problemas com uma manutenção feita recentemente',
        'Suporte da conta',
      ],
    };
    setMessages([welcomeMessage]);

    return () => {
      // Restaura a rolagem da página quando o chat for fechado
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    // Scroll automático para a última mensagem
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Adiciona a mensagem do usuário à lista de mensagens
    const userMessage: Message = { text: message, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput(''); // Limpa o campo de entrada

    try {
      // Envio da mensagem para o Watson Assistant
      const response = await fetch('https://api.us-south.assistant.watson.cloud.ibm.com/v2/assistants/{assistant_id}/sessions/{session_id}/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_WATSON_ASSISTANT_TOKEN`,
        },
        body: JSON.stringify({
          input: {
            text: message,
          },
        }),
      });

      const data = await response.json();

      // Verifica se a resposta tem um texto
      if (response.ok && data.output && data.output.generic) {
        const botReply = data.output.generic[0].text || 'Desculpe, não entendi sua mensagem.';
        // Verifica se o bot deve apresentar opções pré-definidas
        const shouldProvideOptions = ['suporte', 'status', 'problema', 'agendar', 'atendente'].some(keyword =>
          botReply.toLowerCase().includes(keyword)
        );

        const botMessage: Message = {
          text: botReply,
          sender: 'bot',
          options: shouldProvideOptions ? predefinedOptions : undefined,
        };
        setMessages(prevMessages => [...prevMessages, botMessage]); 
      } else {
        const botErrorMessage: Message = {
          text: 'Desculpe, não consegui entender a resposta do assistente.',
          sender: 'bot',
        };
        setMessages(prevMessages => [...prevMessages, botErrorMessage]);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const botErrorMessage: Message = {
        text: 'Desculpe, houve um erro ao processar sua mensagem.',
        sender: 'bot',
      };
      setMessages(prevMessages => [...prevMessages, botErrorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      sendMessage(input.trim());
    }
  };

  const handleOptionClick = (option: string) => {
    sendMessage(option);
  };

  return (
    <div className={styles.chatOverlay}>
      <div className={styles.chatContainer}>
        <header className={styles.chatHeader}>
          <h2>Chat de Suporte</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </header>
        <div className={styles.chatMessages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === 'user'
                  ? styles.userMessageContainer
                  : styles.botMessageContainer
              }
            >
              {msg.sender === 'bot' && (
                <img
                  src="/imagens/carro.png" 
                  alt="Bot Avatar"
                  className={styles.avatar}
                />
              )}
              <div
                className={
                  msg.sender === 'user'
                    ? styles.userMessage
                    : styles.botMessage
                }
              >
                {msg.text}
              </div>
              {msg.sender === 'user' && (
                <img
                  src="/imagens/avatar.png" 
                  alt="User Avatar"
                  className={styles.avatar}
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.chatInput}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
          />
          <button onClick={() => input.trim() && sendMessage(input.trim())}>
            Enviar
          </button>
        </div>
        {messages.some(msg => msg.options) && (
          <div className={styles.predefinedOptions}>
            {messages
              .filter(msg => msg.options)
              .map((msg, msgIndex) =>
                msg.options?.map((option, optionIndex) => (
                  <button
                    key={`${msgIndex}-${optionIndex}`}
                    className={styles.optionButton}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
