import React, { useState, useEffect } from 'react';
import styles from '../assets/Chat.module.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chat: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Enviar mensagem de boas-vindas ao abrir o chat
    const welcomeMessage: Message = { text: 'Bem-Vindo ao ChatBot da CarCheck! Como posso te ajudar? ', sender: 'bot' };
    setMessages(prev => [...prev, welcomeMessage]);
  }, []);

  const sendMessage = async (message: string) => {
    // Adiciona a mensagem do usuário à lista de mensagens
    const userMessage: Message = { text: message, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput(''); // Limpa o campo de entrada

    try {
      // Envio da mensagem para o Watson Assistant
      const response = await fetch('https://api.us-south.assistant.watson.cloud.ibm.com/v2/assistants/d6abeeb1-ba72-469f-9e13-0787de218737/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer pAXC5g3S9W1nbibiSeZvaVHEJfBzfe0749BKZG0SK-_V`,
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
        const botMessage: Message = {
          text: data.output.generic[0].text, // Ajuste conforme a estrutura da resposta do Watson
          sender: 'bot',
        };
        setMessages(prevMessages => [...prevMessages, botMessage]); // Adiciona a resposta do bot
      } else {
        // Mensagem de erro caso não tenha retorno esperado
        const botErrorMessage: Message = {
          text: 'Desculpe, não consegui entender a resposta do assistente.',
          sender: 'bot',
        };
        setMessages(prevMessages => [...prevMessages, botErrorMessage]);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      // Mensagem de erro em caso de falha na chamada
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

  return (
    <div className={styles.chatOverlay}>
      <div className={styles.chatContainer}>
        <header className={styles.chatHeader}>
          <h2>Chat de Suporte</h2>
          <button onClick={onClose} className={styles.closeButton}>X</button>
        </header>
        <div className={styles.chatMessages}>
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className={styles.chatInput}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
          />
          <button onClick={() => input.trim() && sendMessage(input.trim())}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
