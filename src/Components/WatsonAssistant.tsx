import React, { useEffect } from 'react';

const WatsonAssistant: React.FC = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "5efed643-cb22-4c9d-832c-8fab5499e7d7",
      region: "us-south",
      serviceInstanceID: "a409e957-8698-4144-a7c0-ad9c4ae701ef",
      onLoad: async (instance: any) => { await instance.render(); }
    };
    setTimeout(() => {
      const script = document.createElement('script');
      script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js";
      document.head.appendChild(script);
    }, 0);
  }, []);

  return null;
};

export default WatsonAssistant;
