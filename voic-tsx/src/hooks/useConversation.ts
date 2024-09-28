import { useState } from 'react';

export const useConversation = () => {
  const [conversationState, setConversationState] = useState({
    isActive: false,
    type: '',
    voice: '',
    phoneNumber: '',
  });

  const startConversation = (type, voice, phoneNumber) => {
    setConversationState({
      isActive: true,
      type,
      voice,
      phoneNumber,
    });
    // Here you would integrate with your phone call service
    console.log(`Starting ${type} conversation with ${voice} voice on ${phoneNumber}`);
  };

  return {
    conversationState,
    startConversation,
  };
};